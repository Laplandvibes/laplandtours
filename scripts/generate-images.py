"""
Batch-generate the brand images for #LaplandTours via OpenAI gpt-image-1.

Output: WebP q=82 method=6 into public/images/. OG image is generated landscape
and centre-cropped to 1200×630 social spec, saved as public/og-default.jpg
(replaces the temporary SVG).

Usage:  python scripts/generate-images.py [--dry-run] [--only NAME] [--workers N]

Env:    OPENAI_API_KEY required.

Brand: canonical LV deep-night editorial. Aurora / Arctic light / cinematic.
NO Christmas decorations on package cards (except the explicit Christmas card).
NO oversaturated aurora — only faint green-cyan as the Arctic actually is.
NO people unless the slot calls for them (none here).
"""

from __future__ import annotations
import argparse, base64, concurrent.futures as cf, json, os, sys, time, urllib.request
from io import BytesIO
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow not installed. pip install Pillow", file=sys.stderr)
    sys.exit(2)

API_URL = "https://api.openai.com/v1/images/generations"
MODEL = "gpt-image-1"

NEGATIVES = (
    "no text, no logos, no watermarks, no UI elements, no overlay graphics, "
    "no oversaturated aurora, no neon green or pink sky, no fairytale glow, "
    "no people, no human faces, no obvious AI artefacts, no stock-photo plastic look"
)
STYLE = (
    "Editorial documentary travel photography in the style of Conde Nast Traveler "
    "and National Geographic, deep-night LV palette (cool blues, snow whites, faint "
    "green-cyan aurora when relevant), cinematic but understated, real-photograph "
    "aesthetic not 3D render, shallow depth of field, natural cold light. "
    "Composition leaves room for a dark gradient overlay at the top and bottom. "
    f"{NEGATIVES}."
)

# (output filename, prompt, size)  — sizes supported by gpt-image-1: 1024x1024, 1024x1536, 1536x1024
IMAGES: list[tuple[str, str, str, tuple[int, int]]] = [
    # === HEROES ===
    ("hero-home.webp",
     "Wide cinematic landscape of pristine Finnish Lapland on a clear winter afternoon at "
     "golden hour. Snow-laden spruce forest in the foreground, distant rolling fells under "
     "warm low golden sunlight on the horizon, a frozen lake surface catching pink and "
     "amber reflections. Crisp shadows, vivid contrast between cool blue snow shadow and "
     "warm pink-amber lit snow on the fells. Deep cobalt sky above with a faint shimmer of "
     "pale green aurora high overhead — atmospheric, not dominating. Bright, inviting and "
     "alive — NOT a dark night scene, NOT midnight. Composition: lower half is detailed "
     "snowy landscape, upper half is open warm sky for headline overlay. " + STYLE,
     "1536x1024", (2400, 1350)),

    ("hero-holidays.webp",
     "Wide cinematic landscape of a husky team running through a snowy spruce corridor at "
     "deep blue afternoon twilight in Finnish Lapland, fresh powder kicking up, low cool "
     "winter light. Documentary feel, no riders visible, just the dogs from the side. "
     "Composition: dogs lower-third, large empty sky above for overlay. " + STYLE,
     "1536x1024", (2000, 1125)),

    ("hero-practical.webp",
     "Aerial wide shot of a long single-track snow road through endless boreal Lapland "
     "wilderness in pale daylight, low arctic sun on the horizon, winter forest in shades "
     "of cobalt and slate. No vehicles. Map-like overhead-yet-cinematic feel. " + STYLE,
     "1536x1024", (2000, 1125)),

    ("hero-age-guide.webp",
     "Editorial wide shot of a snowy fell summit at golden hour, soft pink and amber light "
     "on the horizon, deep cobalt sky above, untouched powder in the foreground, rolling "
     "fells stretching to the distance. Vast empty composition. " + STYLE,
     "1536x1024", (2000, 1125)),

    # === PACKAGE CARDS (6) — landscape 16:10 ===
    ("card-northern-lights.webp",
     "Cinematic landscape of a faint green-cyan aurora arc above a frozen Lapland lake at "
     "deep blue night, snow-laden spruce forest silhouette below, single distant cabin "
     "with warm window glow. Realistic aurora intensity, NOT neon, NOT pink. " + STYLE,
     "1536x1024", (1200, 750)),

    ("card-christmas-santa.webp",
     "Editorial landscape of a snowy Lapland forest clearing at twilight with two reindeer "
     "grazing in fresh powder, soft cold blue light, distant log cabin barely visible "
     "through the trees with a warm window glow. Quiet and authentic, NOT cartoonish, "
     "NO Santa, NO Christmas decorations, NO red. " + STYLE,
     "1536x1024", (1200, 750)),

    ("card-arctic-adventure.webp",
     "Editorial landscape of a single snowmobile track curving across a vast white frozen "
     "Lapland lake at pale arctic daylight, distant fells on the horizon, cool low sun. "
     "No people, no vehicle visible — just the track and the wilderness. " + STYLE,
     "1536x1024", (1200, 750)),

    ("card-luxury-aurora.webp",
     "Editorial landscape of an interior of a premium glass-roofed wilderness suite at "
     "blue hour: dark wood panelling, a large king bed with crisp linen, faint aurora "
     "visible through the glass roof above the bed, soft warm interior lamp light, no "
     "people. Aman / Six Senses aesthetic, restrained luxury. " + STYLE,
     "1536x1024", (1200, 750)),

    ("card-family-holiday.webp",
     "Editorial landscape of a snowy Lapland forest path at golden afternoon light, two "
     "small empty wooden sleds resting in fresh powder, warm low sun cutting between "
     "spruce trees. Documentary feel, gentle and inviting, no people. " + STYLE,
     "1536x1024", (1200, 750)),

    ("card-midnight-sun.webp",
     "Editorial landscape of a Lapland river bend at midnight sun in July, low warm "
     "horizontal golden light at midnight, mirror-still water reflecting cobalt sky and "
     "amber low sun, dark spruce forest on both banks, no people. " + STYLE,
     "1536x1024", (1200, 750)),
]

# OG image is generated landscape then cropped to the social-spec 1200×630.
OG_IMAGE = (
    "og-default-source.webp",
    "Cinematic landscape photograph of a single illuminated glass igloo on a frozen "
    "Lapland lake at deep blue twilight, faint green aurora arc on the horizon over "
    "snow-laden spruce forest. Warm interior glow, otherwise deep dark blue scene. "
    "Composition designed for a 1200x630 social card with a dark gradient overlay at "
    "top and bottom for title text. " + STYLE,
    "1536x1024",
)


def request_image(api_key: str, prompt: str, size: str) -> bytes:
    body = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "n": 1,
        "size": size,
        "quality": "high",
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        payload = json.loads(resp.read())
    b64 = payload["data"][0]["b64_json"]
    return base64.b64decode(b64)


def crop_resize(img: Image.Image, target: tuple[int, int]) -> Image.Image:
    tw, th = target
    iw, ih = img.size
    # cover-crop
    scale = max(tw / iw, th / ih)
    new = img.resize((int(round(iw * scale)), int(round(ih * scale))), Image.LANCZOS)
    nw, nh = new.size
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return new.crop((left, top, left + tw, top + th))


def save_webp(png_bytes: bytes, out_path: Path, target: tuple[int, int]) -> None:
    img = Image.open(BytesIO(png_bytes)).convert("RGB")
    img = crop_resize(img, target)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "WEBP", quality=82, method=6)


def save_og_jpg(png_bytes: bytes, out_dir: Path) -> None:
    img = Image.open(BytesIO(png_bytes)).convert("RGB")
    cropped = crop_resize(img, (1200, 630))
    out_dir.mkdir(parents=True, exist_ok=True)
    cropped.save(out_dir / "og-default.jpg", "JPEG", quality=85, optimize=True, progressive=True)


def generate_one(api_key: str, name: str, prompt: str, size: str, target: tuple[int, int], out_dir: Path) -> tuple[str, bool, str]:
    out_path = out_dir / name
    started = time.time()
    try:
        png_bytes = request_image(api_key, prompt, size)
        save_webp(png_bytes, out_path, target)
        size_kb = out_path.stat().st_size // 1024
        return name, True, f"{size_kb} kB in {time.time()-started:.1f} s"
    except Exception as e:
        return name, False, f"{type(e).__name__}: {e}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--only", help="Generate only this filename (e.g. hero-home.webp)")
    ap.add_argument("--workers", type=int, default=3)
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    repo_root = Path(__file__).resolve().parent.parent
    out_dir = Path(args.out) if args.out else repo_root / "public" / "images"
    public_root = repo_root / "public"

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key and not args.dry_run:
        print("ERROR: OPENAI_API_KEY not set", file=sys.stderr)
        return 2

    plan = [(n, p, s, t) for n, p, s, t in IMAGES if not args.only or args.only == n]

    if args.dry_run:
        for name, prompt, size, target in plan:
            print(f"\n— {name} ({size} -> {target}) —\n{prompt}")
        if not args.only or args.only == "og-default.jpg":
            print(f"\n— og-default.jpg ({OG_IMAGE[2]} -> 1200x630) —\n{OG_IMAGE[1]}")
        return 0

    out_dir.mkdir(parents=True, exist_ok=True)
    public_root.mkdir(parents=True, exist_ok=True)

    print(f"Generating {len(plan)} images via {MODEL} -> {out_dir}\n")
    failed: list[str] = []
    with cf.ThreadPoolExecutor(max_workers=args.workers) as pool:
        futures = {
            pool.submit(generate_one, api_key, n, p, s, t, out_dir): n
            for n, p, s, t in plan
        }
        for fut in cf.as_completed(futures):
            name, ok, msg = fut.result()
            print(f"  {'OK' if ok else 'XX'}  {name:32s}  {msg}")
            if not ok:
                failed.append(name)

    if not args.only or args.only == "og-default.jpg":
        try:
            print("\nGenerating OG image (1200x630 social spec)...")
            png = request_image(api_key, OG_IMAGE[1], OG_IMAGE[2])
            save_og_jpg(png, public_root)
            sz = (public_root / "og-default.jpg").stat().st_size // 1024
            print(f"  OK  og-default.jpg                {sz} kB")
        except Exception as e:
            print(f"  XX  og-default.jpg                {type(e).__name__}: {e}")
            failed.append("og-default.jpg")

    if failed:
        print(f"\nFAILED: {', '.join(failed)}")
        return 1
    print("\nAll generated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
