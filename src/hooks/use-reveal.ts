import { useEffect, useRef } from "react";

/** IntersectionObserver hook that adds `.in` to elements with `.reveal` */
export function useReveal() {
  const root = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const scope = root.current ?? document;
    const els = scope.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return root;
}
