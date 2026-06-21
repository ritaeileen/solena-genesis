import { useEffect, useState } from "react";

/** Returns true when viewport width is >= breakpoint (default 1024px desktop). */
export function useIsDesktop(bp = 1024) {
  const [is, setIs] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${bp}px)`);
    const update = () => setIs(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [bp]);
  return is;
}
