/**
 * Branded CSS-gradient placeholder for #LaplandTours.
 * Renders a real <img> if `src` is provided, otherwise one of 6 LV variants.
 */

export type PlaceholderVariant =
  | 'aurora'
  | 'ice'
  | 'forest'
  | 'fell'
  | 'twilight'
  | 'wilderness';

const GRADIENTS: Record<PlaceholderVariant, string> = {
  aurora: 'linear-gradient(135deg, #0d2818 0%, #0F172A 35%, #1e1b4b 70%, #0F172A 100%)',
  ice: 'linear-gradient(135deg, #051020 0%, #0F172A 40%, #061a2a 80%, #0F172A 100%)',
  forest: 'linear-gradient(135deg, #0a1612 0%, #0F172A 40%, #0d1a1f 80%, #0F172A 100%)',
  fell: 'linear-gradient(135deg, #1a0a14 0%, #0F172A 45%, #1a1029 100%)',
  twilight: 'linear-gradient(135deg, #001b3a 0%, #002F6C 35%, #0F172A 75%, #001a40 100%)',
  wilderness: 'linear-gradient(135deg, #07221c 0%, #0F172A 50%, #0a1f33 100%)',
};

interface Props {
  variant?: PlaceholderVariant;
  className?: string;
  label?: string;
  src?: string;
  alt?: string;
  objectPosition?: string;
  priority?: boolean;
  imgClassName?: string;
}

export default function ImagePlaceholder({
  variant = 'aurora',
  className = '',
  label,
  src,
  alt,
  objectPosition,
  priority = false,
  imgClassName = '',
}: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        className={`absolute inset-0 w-full h-full object-cover ${imgClassName} ${className}`}
        style={objectPosition ? { objectPosition } : undefined}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{ background: GRADIENTS[variant] }}
      role="img"
      aria-label={label ?? alt ?? 'Atmospheric Lapland landscape'}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.04) 0%, transparent 70%)',
        }}
      />
      {label && (
        <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
          <span className="font-heading tracking-wide text-snow/30 text-2xl sm:text-3xl text-center">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
