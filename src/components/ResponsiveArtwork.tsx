import { useIsDesktop } from "@/hooks/use-is-desktop";

interface Props {
  desktop: { url: string };
  mobile: { url: string };
  alt: string;
  className?: string;
  priority?: boolean;
}

/** Loads landscape on desktop (>=1024px) and portrait on mobile. */
export function ResponsiveArtwork({ desktop, mobile, alt, className, priority }: Props) {
  const isDesktop = useIsDesktop();
  const src = isDesktop ? desktop.url : mobile.url;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
    />
  );
}
