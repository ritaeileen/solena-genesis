import type { CSSProperties } from "react";
import { useIsDesktop } from "@/hooks/use-is-desktop";

interface Props {
  desktop: { url: string };
  mobile: { url: string };
  alt: string;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
}

/** Loads landscape on desktop (>=1024px) and portrait on mobile. */
export function ResponsiveArtwork({ desktop, mobile, alt, className, priority, style }: Props) {
  const isDesktop = useIsDesktop();
  const src = isDesktop ? desktop.url : mobile.url;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
    />
  );
}
