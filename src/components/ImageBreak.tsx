/**
 * Cinematic full-bleed image break. Used between editorial sections to
 * give the page a magazine-spread rhythm. Optional pull-quote overlays
 * lower-left in italic Bebas Neue with a vibe-pink hairline rule.
 *
 * No CTA, no card frame, no Lucide icon. Just image + caption + optional
 * quote.
 */

interface Props {
  src: string;
  alt: string;
  quote?: string;
  /** Deprecated; kept for backwards compatibility — ignored in render. */
  caption?: string;
  /** Deprecated; kept for backwards compatibility — ignored in render. */
  attribution?: string;
}

export default function ImageBreak({ src, alt, quote }: Props) {
  return (
    <section className="relative w-full h-[60svh] sm:h-[70svh] lg:h-[640px] overflow-hidden bg-deep-night">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {quote && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(15,23,42,0) 60%, rgba(15,23,42,0.5) 100%)',
            }}
          />
          <blockquote className="absolute bottom-12 sm:bottom-16 left-6 sm:left-10 lg:left-16 max-w-xl z-10">
            <p className="pull-quote">{quote}</p>
          </blockquote>
        </>
      )}
    </section>
  );
}
