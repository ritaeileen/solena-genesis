import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ResponsiveArtwork } from "@/components/ResponsiveArtwork";
import { RequestAccessModal } from "@/components/RequestAccessModal";

import logo from "@/assets/solena-logo.png.asset.json";
import vieLandscape from "@/assets/vie-halo.png.asset.json";
import viePortrait from "@/assets/vie-portrait.png.asset.json";
import spiralLandscape from "@/assets/spiral.png.asset.json";
import spiralPortrait from "@/assets/spiral-portrait.png.asset.json";
import g01Landscape from "@/assets/g-01.png.asset.json";
import g01Portrait from "@/assets/g-01-portrait.png.asset.json";
import g01Video from "@/assets/g-01.mp4.asset.json";
import g01VideoPortrait from "@/assets/g-01-portrait.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Solena — Gravity for Culture, Capital & Legacy" },
      {
        name: "description",
        content:
          "Solena is a luxury growth studio engineering brands, spaces, ventures and cultural systems into legacy institutions.",
      },
      { property: "og:title", content: "Solena — Gravity for Culture, Capital & Legacy" },
      {
        property: "og:description",
        content: "We do not build companies. We build ecosystems of institutions.",
      },
      { property: "og:image", content: vieLandscape.url },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: SolenaLanding,
});

const PILLARS = [
  { n: "01", title: "Culture", hover: "Brands people belong to, not buy." },
  { n: "02", title: "Space", hover: "Architecture as identity." },
  { n: "03", title: "Media", hover: "Narrative systems that compound influence." },
  { n: "04", title: "Ventures", hover: "Businesses designed for decades." },
];

const SECTORS = [
  "Real Estate",
  "Hospitality",
  "Luxury",
  "Media",
  "Architecture",
  "Culture",
  "Capital",
  "Technology",
];

const STANDARDS = [
  ["We do not optimize for speed.", "We optimize for permanence."],
  ["We do not follow trends.", "We define signals."],
  ["We do not build for markets.", "We build for memory."],
  ["We do not design for visibility.", "We design for inevitability."],
] as const;

const TRANSFORMS = [
  ["A brand", "A category authority"],
  ["A property", "A destination"],
  ["A concept", "A cultural signal"],
  ["A business", "A legacy asset"],
] as const;

const ARTICLES = [
  { n: "01", title: "The Architecture of Gravity", read: "On why some brands attract and others chase." },
  { n: "02", title: "Luxury as Infrastructure", read: "Building the substrate beneath desire." },
  { n: "03", title: "Why Most Brands Disappear", read: "Distribution is not the same as memory." },
  { n: "04", title: "Cultural Compounding", read: "The mathematics of relevance over decades." },
  { n: "05", title: "Designing for the Next Century", read: "Notes from a longer time horizon." },
];

function SolenaLanding() {
  const root = useReveal();
  const reducedMotion = useReducedMotion();
  const [accessOpen, setAccessOpen] = useState(false);
  const openAccess = useCallback(() => setAccessOpen(true), []);

  return (
    <main
      ref={root as RefObject<HTMLElement>}
      data-reduced-motion={reducedMotion || undefined}
      className="page-shell relative overflow-hidden bg-obsidian-deep text-ivory"
    >
      <div className="ambient-fog" />
      <Nav onOpenAccess={openAccess} />
      <Hero onOpenAccess={openAccess} />
      <Thesis />
      <WhatWeBuild />
      <Ecosystem />
      <Standard />
      <Transformations />
      <Journal />
      <Future />
      <Invitation onOpenAccess={openAccess} />
      <Footer />
      <RequestAccessModal open={accessOpen} onOpenChange={setAccessOpen} />
    </main>
  );
}

function Nav({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo.url} alt="Solena" className="h-9 w-9 opacity-90" />
          <span className="font-display text-lg tracking-[0.4em] text-ivory/88">SOLENA</span>
        </a>

        <nav className="hidden items-center gap-10 text-[10px] tracking-eyebrow text-stone/68 md:flex">
          <a href="#thesis" className="transition hover:text-ivory">Thesis</a>
          <a href="#build" className="transition hover:text-ivory">Practice</a>
          <a href="#ecosystem" className="transition hover:text-ivory">Ecosystem</a>
          <a href="#journal" className="transition hover:text-ivory">Journal</a>
          <button type="button" onClick={onOpenAccess} className="transition hover:text-ivory">Access</button>
        </nav>

        <div className="hidden text-[10px] tracking-eyebrow text-stone/46 md:block">MMXXV · By invitation</div>
      </div>
    </header>
  );
}

function Hero({ onOpenAccess }: { onOpenAccess: () => void }) {
  const reducedMotion = useReducedMotion();
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(Math.min(1, window.scrollY / (window.innerHeight * 0.95)));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const haloMotion = reducedMotion
    ? {
        opacity: 1 - scroll * 0.35,
        transform: "translate3d(0, 0, 0) scale(1)",
        filter: "blur(0px)",
      }
    : {
        opacity: 1 - scroll * 0.6,
        transform: `translate3d(0, ${scroll * -40}px, 0) scale(${1 + scroll * 0.08})`,
        filter: `blur(${scroll * 6}px)`,
      };

  return (
    <section id="top" className="orbital-stage relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <div
        className="absolute inset-0 z-0"
        style={{
          ...haloMotion,
          transition: reducedMotion ? "opacity 240ms linear" : "filter 220ms linear",
          willChange: reducedMotion ? "opacity" : "transform, opacity, filter",
        }}
      >
        <div
          className={`absolute inset-0 ${reducedMotion ? "" : "animate-drift"}`}
          style={{
            mixBlendMode: "screen",
            maskImage:
              "radial-gradient(ellipse 68% 62% at 70% 38%, black 28%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 68% 62% at 70% 38%, black 28%, transparent 78%)",
          }}
        >
          <ResponsiveArtwork
            desktop={vieLandscape}
            mobile={viePortrait}
            alt=""
            priority
            className="h-full w-full object-cover"
            style={{ opacity: reducedMotion ? 0.45 : 0.6, filter: reducedMotion ? "contrast(1.02)" : "contrast(1.05) brightness(1.02)" }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            mixBlendMode: "screen",
            opacity: 0.32,
            filter: "blur(60px) saturate(115%)",
            maskImage: "radial-gradient(circle at 72% 30%, black 0%, transparent 60%)",
            WebkitMaskImage: "radial-gradient(circle at 72% 30%, black 0%, transparent 60%)",
          }}
        >
          <ResponsiveArtwork
            desktop={vieLandscape}
            mobile={viePortrait}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(255,255,255,0.05),transparent_0_22%,transparent_23%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-deep via-transparent to-obsidian-deep/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep/40 via-transparent to-obsidian-deep" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 pb-18 pt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-12">
        <div className="order-2 flex flex-col justify-end gap-8 lg:order-1 lg:pb-10">
          <div className="reveal section-label">
            <span>00</span>
            <span>Threshold</span>
          </div>

          <div className="max-w-xl">
            <h1 className="animate-rise font-display text-[20vw] leading-[0.88] tracking-[0.08em] text-ivory sm:text-[15vw] md:text-[11vw] lg:text-[8rem]">
              SOLENA
            </h1>
            <p
              className="animate-rise mt-10 max-w-lg font-display text-[2rem] leading-[1.02] text-ivory/94 md:text-[2.8rem] lg:text-[3.35rem]"
              style={{ animationDelay: "220ms" }}
            >
              We build gravity for culture,
              <br />
              capital, and legacy.
            </p>
            <p
              className="animate-rise mt-7 max-w-md text-sm leading-relaxed text-stone/72 md:text-base"
              style={{ animationDelay: "420ms" }}
            >
              Luxury is not created. It is engineered.
            </p>
          </div>

          <div className="animate-rise mt-4 flex flex-col items-start gap-5" style={{ animationDelay: "620ms" }}>
            <button type="button" onClick={onOpenAccess} className="btn-solena">
              <span className="label-main">
                Enter the Ecosystem
                <span className="arrow">→</span>
              </span>
              <span className="label-hover">
                Cross the threshold
                <span className="arrow">→</span>
              </span>
            </button>
            <p className="text-[10px] tracking-eyebrow text-stone/42">Access is selective</p>
          </div>
        </div>

        <div className="order-1 flex items-center justify-end lg:order-2">
          <div className="reveal relative hidden h-[520px] w-full max-w-[760px] lg:block">
            <div className="absolute inset-y-0 right-0 flex w-full items-center justify-end">
              <div className={`relative h-[520px] w-[520px] rounded-full border border-ivory/10 ${reducedMotion ? "" : "animate-ring"}`}>
                <div className="absolute inset-[9%] rounded-full border border-ivory/7" />
                <div className="absolute inset-[22%] rounded-full border border-ivory/7" />
                <div className="absolute inset-[34%] rounded-full border border-ivory/7" />
                <div className="absolute inset-[39%] rounded-full glass-strong">
                  <div className="flex h-full items-center justify-center">
                    <span className="font-display text-4xl tracking-[0.12em] text-ivory/92">SOLENA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-10 flex items-start gap-7">
              <div className="pt-2 text-right text-[10px] tracking-eyebrow text-stone/56">
                01 What We Build
              </div>
              <div className="navigator-stack pt-1">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="absolute bottom-12 right-3 side-rail">↑ To Navigate</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[10px] tracking-eyebrow text-stone/40">
        <span>Descend</span>
        <span className="h-12 w-px bg-gradient-to-b from-stone/40 to-transparent" />
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section id="thesis" className="section-edge relative overflow-hidden py-36 lg:py-56">
      <div className="absolute inset-0 opacity-20">
        <ResponsiveArtwork desktop={vieLandscape} mobile={viePortrait} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep via-obsidian/38 to-obsidian-deep" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="section-grid gap-14 lg:gap-20">
          <div className="reveal">
            <div className="section-label">
              <span>02</span>
              <span>The Solena Thesis</span>
            </div>
          </div>

          <div className="space-y-10">
            <h2 className="reveal font-display text-5xl leading-[1.01] text-ivory md:text-7xl lg:text-[5.6rem]">
              Most organizations
              <br />
              compete for attention.
              <br />
              <span className="text-stone/62">Solena builds gravity.</span>
            </h2>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
              <p className="reveal reveal-delay-1 font-display text-[1.7rem] leading-[1.15] text-ivory/90 md:text-[2.25rem]">
                Gravity does not advertise.
                <br />
                It attracts.
              </p>
              <div className="reveal reveal-delay-2 space-y-5 text-base leading-relaxed text-stone/78 md:text-lg">
                <p>It attracts capital that thinks long-term.</p>
                <p>It attracts founders who think in decades.</p>
                <p>It attracts institutions that outlive trends.</p>
                <p className="pt-5 text-ivory/88">
                  We are not a service provider. We are an acceleration layer for legacy.
                </p>
              </div>
            </div>

            <div className="reveal mt-16 flex items-center gap-6">
              <span className="bronze-line h-px flex-1" />
              <p className="text-[11px] tracking-eyebrow text-stone/58">What we build cannot be commoditized</p>
              <span className="bronze-line h-px flex-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeBuild() {
  return (
    <section id="build" className="section-edge relative overflow-hidden py-36 lg:py-56">
      <div className="absolute inset-0 opacity-16">
        <ResponsiveArtwork desktop={spiralLandscape} mobile={spiralPortrait} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/16 to-obsidian-deep" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="section-grid gap-14 lg:gap-20">
          <div className="reveal space-y-8">
            <div className="section-label">
              <span>03</span>
              <span>What We Build</span>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-stone/72">
              Four floating disciplines, suspended inside one civilizational field.
            </p>
          </div>

          <div className="space-y-10">
            <h2 className="reveal font-display text-4xl leading-[1.02] text-ivory md:text-6xl lg:text-[4.5rem]">
              Four disciplines.
              <br />
              <span className="text-stone/60">One field.</span>
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {PILLARS.map((pillar, index) => (
                <PillarCard key={pillar.title} {...pillar} delay={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ n, title, hover, delay }: { n: string; title: string; hover: string; delay: number }) {
  return (
    <article
      className={`reveal reveal-delay-${Math.min(delay + 1, 4)} group glass relative aspect-[0.94/1] overflow-hidden px-7 py-7 transition duration-500 hover:-translate-y-1.5 hover:bg-white/[0.05]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_44%)] opacity-50" />
      <div className="relative flex h-full flex-col justify-between">
        <span className="text-[10px] tracking-eyebrow text-bronze/74">{n}</span>
        <div>
          <h3 className="font-display text-4xl text-ivory md:text-[2.8rem]">{title}</h3>
          <p className="mt-5 max-w-[15rem] text-sm leading-relaxed text-stone/68 opacity-0 transition duration-500 group-hover:opacity-100">
            {hover}
          </p>
        </div>
      </div>
      <span className="absolute left-0 top-0 h-px w-0 bg-bronze/60 transition-all duration-700 group-hover:w-full" />
    </article>
  );
}

function Ecosystem() {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(6);
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const positions = useMemo(
    () =>
      SECTORS.map((_, index) => {
        const angle = (index / SECTORS.length) * Math.PI * 2 - Math.PI / 2;
        return { x: Math.cos(angle), y: Math.sin(angle) };
      }),
    [],
  );

  const focusNode = (index: number) => {
    const next = ((index % SECTORS.length) + SECTORS.length) % SECTORS.length;
    nodeRefs.current[next]?.focus();
  };

  const onNodeKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        focusNode(index + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        focusNode(index - 1);
        break;
      case "Home":
        e.preventDefault();
        focusNode(0);
        break;
      case "End":
        e.preventDefault();
        focusNode(SECTORS.length - 1);
        break;
      case "Escape":
        e.preventDefault();
        (e.currentTarget as HTMLButtonElement).blur();
        setActive(6);
        break;
    }
  };

  return (
    <section id="ecosystem" className="section-edge orbital-stage relative overflow-hidden py-40 lg:py-64">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,240,232,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,232,0.35) 1px, transparent 1px)",
          backgroundSize: "86px 86px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_34%,rgba(255,255,255,0.08),transparent_0_16%,transparent_17%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="section-grid gap-14 lg:gap-24">
          <div className="reveal flex flex-col justify-center space-y-8 lg:pr-6">
            <div className="section-label">
              <span>04</span>
              <span>Ecosystem Map</span>
            </div>
            <p className="max-w-md text-[1.9rem] leading-[1.18] text-stone md:text-[2.55rem] font-display">
              Solena sits at the center of converging sectors.
            </p>
            <p className="max-w-md text-base leading-relaxed text-stone/70 md:text-lg">
              Where brand, built environment, culture, capital, and narrative architecture begin to move as a single field.
            </p>
            <div className="space-y-2 pt-2">
              <p className="text-[10px] tracking-eyebrow text-stone/48">Active sector</p>
              <p
                className="font-display text-4xl text-ivory md:text-5xl"
                aria-live="polite"
                aria-atomic="true"
              >
                {active !== null ? SECTORS[active] : "—"}
              </p>
              <p className="pt-3 text-[10px] tracking-eyebrow text-stone/40">
                Use arrow keys to traverse · Esc to release
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-1 relative min-h-[430px] lg:min-h-[720px]">
            <div className="absolute right-0 top-4 z-10 hidden items-start gap-7 lg:flex">
              <div className="pt-3 text-right text-[10px] tracking-eyebrow text-stone/56">03 What We Build</div>
              <div className="navigator-stack pt-1">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="absolute bottom-8 right-0 hidden lg:block side-rail">↑ To Navigate</div>

            <div
              className="relative ml-auto aspect-square w-full max-w-[720px]"
              role="group"
              aria-label="Solena ecosystem — sectors orbiting the studio anchor. Use arrow keys to traverse."
            >
              {[1.12, 0.83, 0.58, 0.34].map((size, index) => (
                <div
                  key={size}
                  className={`absolute left-1/2 top-1/2 rounded-full border border-ivory/[0.08] ${index === 0 ? "opacity-60" : "opacity-50"}`}
                  style={{
                    width: `${size * 100}%`,
                    height: `${size * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full bg-bronze/10 blur-3xl ${reducedMotion ? "" : "animate-pulse-slow"}`} />
                  <div className="glass-strong relative flex h-32 w-32 items-center justify-center rounded-full sm:h-40 sm:w-40 lg:h-52 lg:w-52">
                    <span className="font-display text-[1.8rem] tracking-[0.08em] text-ivory/92 lg:text-[2.7rem]">SOLENA</span>
                  </div>
                </div>
              </div>

              {SECTORS.map((sector, index) => {
                const { x, y } = positions[index];
                const isActive = active === index;
                const isDimmed = active !== null && !isActive;
                const scale = index % 3 === 0 ? 1.18 : index % 3 === 1 ? 1 : 0.94;
                // radius as % of container; keep nodes clear of center anchor
                const r = 42;
                const left = 50 + x * r;
                const top = 50 + y * r;
                return (
                  <button
                    key={sector}
                    ref={(el) => { nodeRefs.current[index] = el; }}
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onMouseLeave={() => setActive(6)}
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(6)}
                    onKeyDown={(e) => onNodeKeyDown(e, index)}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-bronze-glow/70 focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian-deep"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      transition: reducedMotion
                        ? "opacity 180ms ease, filter 180ms ease"
                        : "opacity 600ms cubic-bezier(0.16,1,0.3,1), filter 600ms cubic-bezier(0.16,1,0.3,1)",
                      opacity: isDimmed ? (reducedMotion ? 0.62 : 0.42) : 1,
                      filter: isDimmed && !reducedMotion ? "blur(1px)" : "blur(0)",
                    }}
                    aria-label={`${sector} — sector ${index + 1} of ${SECTORS.length}`}
                    aria-pressed={isActive}
                  >
                    <div
                      className="glass-node flex items-center justify-center rounded-full text-center"
                      style={{
                        width: `${6.4 * scale}rem`,
                        height: `${6.4 * scale}rem`,
                        transition: reducedMotion
                          ? "border-color 180ms ease, background-color 180ms ease"
                          : "transform 700ms cubic-bezier(0.16,1,0.3,1), background-color 500ms ease, border-color 500ms ease, box-shadow 700ms ease",
                        transform: isActive && !reducedMotion ? "scale(1.08)" : "scale(1)",
                        borderColor: isActive
                          ? "oklch(0.68 0.055 65 / 55%)"
                          : "oklch(0.96 0.004 76 / 14%)",
                        background: isActive
                          ? "linear-gradient(180deg, oklch(0.97 0.004 76 / 12%), oklch(0.97 0.004 76 / 5%))"
                          : undefined,
                        boxShadow: isActive && !reducedMotion
                          ? "0 0 0 1px oklch(0.68 0.055 65 / 20%), 0 24px 70px oklch(0.03 0.002 67 / 40%), inset 0 1px 0 oklch(0.99 0.004 76 / 10%)"
                          : undefined,
                      }}
                    >
                      <span
                        className="font-sans text-[0.78rem] leading-tight tracking-[0.02em] lg:text-[0.95rem]"
                        style={{
                          color: isActive ? "var(--color-ivory)" : "oklch(0.83 0.011 76 / 76%)",
                          transition: reducedMotion ? "color 180ms ease" : "color 500ms ease, letter-spacing 500ms ease",
                          letterSpacing: isActive && !reducedMotion ? "0.06em" : "0.02em",
                        }}
                      >
                        {sector}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Standard() {
  return (
    <section className="section-edge relative bg-obsidian-deep py-44 lg:py-72">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="section-label reveal mb-20">
          <span>05</span>
          <span>The Standard</span>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {STANDARDS.map(([before, after], index) => (
            <div key={before} className="reveal" style={{ transitionDelay: `${index * 80}ms` }}>
              <p className="font-display text-3xl leading-tight text-stone/38 md:text-5xl lg:text-6xl">{before}</p>
              <p className="mt-3 font-display text-3xl leading-tight text-ivory md:text-5xl lg:text-6xl">{after}</p>
            </div>
          ))}
        </div>

        <div className="reveal mt-36 border-t border-ivory/10 pt-16">
          <p className="max-w-4xl font-display text-3xl leading-tight text-ivory/92 md:text-5xl lg:text-6xl">
            If it cannot exist for decades,
            <br />
            <span className="text-bronze-glow/90">we do not build it.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Transformations() {
  return (
    <section className="section-edge relative overflow-hidden py-36 lg:py-56">
      <div className="absolute inset-0 opacity-22">
        <ResponsiveArtwork desktop={g01Landscape} mobile={g01Portrait} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-deep/20 via-obsidian/46 to-obsidian-deep" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <div className="section-grid gap-14 lg:gap-20">
          <div className="reveal space-y-8">
            <div className="section-label">
              <span>06</span>
              <span>Transformations</span>
            </div>
            <p className="max-w-sm text-lg leading-relaxed text-stone/72">
              No portfolio parade. Only state-shift: what something becomes after Solena enters the field.
            </p>
          </div>

          <div>
            <h2 className="reveal font-display text-4xl leading-[1.02] text-ivory md:text-6xl lg:text-[4.6rem]">
              We do not execute projects.
              <br />
              <span className="text-stone/60">We shift states.</span>
            </h2>

            <div className="mt-16 divide-y divide-ivory/10 border-y border-ivory/10">
              {TRANSFORMS.map(([from, to], index) => (
                <div
                  key={from}
                  className="reveal grid grid-cols-1 items-center gap-6 py-10 group md:grid-cols-[1fr_auto_1fr] md:py-14"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <p className="font-display text-3xl text-stone/48 transition-colors group-hover:text-stone/72 md:text-right md:text-4xl">
                    {from}
                  </p>
                  <span className="hidden px-6 text-2xl text-bronze/66 transition-transform group-hover:translate-x-1 md:block">→</span>
                  <span className="text-xl text-bronze/66 md:hidden">↓</span>
                  <p className="font-display text-3xl text-ivory md:text-4xl">{to}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section id="journal" className="section-edge relative py-36 lg:py-56">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="section-grid gap-14 lg:gap-20">
          <div className="reveal space-y-8">
            <div className="section-label">
              <span>07</span>
              <span>The Journal</span>
            </div>
            <p className="max-w-sm text-lg leading-relaxed text-stone/70">
              Editorial intelligence — written before industries can name what is emerging.
            </p>
          </div>

          <div>
            <h2 className="reveal font-display text-4xl leading-[1.02] text-ivory md:text-6xl lg:text-[4.6rem]">
              Ideas before they
              <br />
              become industries.
            </h2>

            <div className="mt-14 border-t border-ivory/10">
              {ARTICLES.map((article, index) => (
                <a
                  key={article.n}
                  href="#"
                  className="reveal group block border-b border-ivory/10 py-8 transition-colors hover:bg-white/[0.02] md:py-10"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="grid grid-cols-[auto_1fr] gap-6 md:grid-cols-[auto_1fr_auto] md:gap-10">
                    <span className="w-10 font-display text-xl text-stone/38">{article.n}</span>
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-2xl text-ivory md:text-4xl">{article.title}</h3>
                      <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-stone/60 transition-all duration-500 group-hover:max-h-20">
                        {article.read}
                      </p>
                    </div>
                    <span className="hidden whitespace-nowrap text-[10px] tracking-eyebrow text-stone/42 transition-colors group-hover:text-bronze-glow md:block">
                      Read the pre-language →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Future() {
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();

  return (
    <section className="section-edge relative flex min-h-[100svh] items-center overflow-hidden py-24">
      <div className="absolute inset-0">
        <video
          key={isDesktop ? "desktop-video" : "mobile-video"}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          poster={isDesktop ? g01Landscape.url : g01Portrait.url}
          src={isDesktop ? g01Video.url : g01VideoPortrait.url}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/24 via-obsidian/56 to-obsidian-deep" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 lg:px-12">
        <div className="section-label reveal mb-10">
          <span>08</span>
          <span>Solena 2035</span>
        </div>

        <h2 className="reveal max-w-4xl font-display text-5xl leading-[1.01] text-ivory md:text-7xl lg:text-[5.8rem]">
          We are not building
          <br />
          a company.
          <br />
          <span className="text-stone/60">We are building an ecosystem of institutions.</span>
        </h2>

        <ul className="reveal reveal-delay-1 mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            "Cultural institutions",
            "Luxury developments",
            "Media architecture",
            "Venture systems",
            "Design laboratories",
          ].map((item, index) => (
            <li key={item} className="glass px-5 py-6 text-sm tracking-wide text-ivory/82">
              <span className="mb-3 block text-[10px] tracking-eyebrow text-bronze/70">0{index + 1}</span>
              {item}
            </li>
          ))}
        </ul>

        <p className="reveal reveal-delay-2 mt-20 font-display text-3xl text-ivory/92 md:text-5xl">The present is just the prototype.</p>
      </div>
    </section>
  );
}

function Invitation({ onOpenAccess }: { onOpenAccess: () => void }) {
  return (
    <section id="invitation" className="relative bg-obsidian-deep py-44 lg:py-72">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-12">
        <div className="reveal mb-12 flex items-center justify-center gap-4 text-[10px] tracking-eyebrow text-bronze/78">
          <span className="h-px w-10 bg-bronze/40" />
          <span>09 · Invitation</span>
          <span className="h-px w-10 bg-bronze/40" />
        </div>

        <h2 className="reveal font-display text-5xl leading-[1.03] text-ivory md:text-7xl">
          Access is not open.
          <br />
          <span className="text-stone/60">It is aligned.</span>
        </h2>

        <p className="reveal reveal-delay-1 mx-auto mt-12 max-w-xl text-base leading-relaxed text-stone/70 md:text-lg">
          We work with those building beyond cycles. Founders. Institutions. Architects. Investors. Cultural builders.
        </p>

        <div className="reveal reveal-delay-2 mt-16 flex flex-col items-center gap-5">
          <button type="button" onClick={onOpenAccess} className="btn-solena">
            <span className="label-main">
              Request Access
              <span className="arrow">→</span>
            </span>
            <span className="label-hover">
              Signal alignment
              <span className="arrow">→</span>
            </span>
          </button>
          <p className="text-[10px] tracking-eyebrow text-stone/40">Not everyone will be reviewed</p>
        </div>

        <p className="reveal reveal-delay-3 mx-auto mt-24 max-w-2xl font-display text-xl italic text-stone/58 md:text-2xl">
          “If Solena is relevant to your trajectory, you will know before we respond.”
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-ivory/10 px-6 py-16 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3 md:items-center">
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="Solena" className="h-8 w-8 opacity-80" />
          <span className="font-display tracking-[0.4em] text-ivory/80">SOLENA</span>
        </div>
        <p className="text-center text-[10px] tracking-eyebrow text-stone/40">Engineering legacy · Est. MMXXV</p>
        <p className="text-[10px] tracking-eyebrow text-stone/40 md:text-right">access@solena.studio</p>
      </div>
    </footer>
  );
}
