import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useIsDesktop } from "@/hooks/use-is-desktop";
import { ResponsiveArtwork } from "@/components/ResponsiveArtwork";

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

/* ------------------------------------------------------------------ */

function SolenaLanding() {
  const root = useReveal();
  return (
    <main ref={root as React.RefObject<HTMLElement>} className="bg-obsidian text-ivory relative">
      <Nav />
      <Hero />
      <Thesis />
      <WhatWeBuild />
      <Ecosystem />
      <Standard />
      <Transformations />
      <Journal />
      <Future />
      <Invitation />
      <Footer />
    </main>
  );
}

/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="px-6 lg:px-12 py-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <img src={logo.url} alt="Solena" className="h-9 w-9 opacity-90 transition group-hover:opacity-100" />
          <span className="font-display text-lg tracking-[0.4em] text-ivory/90">SOLENA</span>
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[10px] tracking-eyebrow text-stone/70">
          <a href="#thesis" className="hover:text-ivory transition">Thesis</a>
          <a href="#build" className="hover:text-ivory transition">Practice</a>
          <a href="#ecosystem" className="hover:text-ivory transition">Ecosystem</a>
          <a href="#journal" className="hover:text-ivory transition">Journal</a>
          <a href="#invitation" className="hover:text-ivory transition">Access</a>
        </nav>
        <div className="hidden md:block text-[10px] tracking-eyebrow text-stone/50">
          MMXXV · By invitation
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  // Slow particle dissolve on scroll
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const on = () => setScroll(Math.min(1, window.scrollY / (window.innerHeight * 0.9)));
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background halo artwork — becomes the page */}
      <div
        className="absolute inset-0 z-0"
        style={{
          opacity: 1 - scroll * 0.6,
          transform: `scale(${1 + scroll * 0.08})`,
          filter: `blur(${scroll * 6}px)`,
          transition: "filter 200ms linear",
        }}
      >
        <ResponsiveArtwork
          desktop={vieLandscape}
          mobile={viePortrait}
          alt=""
          priority
          className="w-full h-full object-cover animate-drift"
        />
        {/* darken into obsidian */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/55 via-obsidian/70 to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#0a0a0a_85%)]" />
      </div>

      {/* Eyebrow */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 animate-fade">
        <div className="flex items-center gap-4 text-[10px] tracking-eyebrow text-stone/60">
          <span className="h-px w-10 bg-stone/40" />
          <span>A Luxury Growth Studio</span>
          <span className="h-px w-10 bg-stone/40" />
        </div>
      </div>

      {/* Center text emerging from artwork */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <h1 className="font-display text-[18vw] sm:text-[14vw] md:text-[10vw] lg:text-[9rem] leading-[0.9] tracking-[0.06em] text-ivory animate-rise">
          SOLENA
        </h1>
        <p
          className="mt-12 font-display text-2xl md:text-4xl lg:text-5xl leading-tight text-ivory/95 animate-rise"
          style={{ animationDelay: "300ms" }}
        >
          We build gravity for culture,
          <br />
          capital, and legacy.
        </p>
        <p
          className="mt-8 text-sm md:text-base text-stone/70 max-w-xl mx-auto animate-rise"
          style={{ animationDelay: "600ms" }}
        >
          Luxury is not created. It is engineered.
        </p>

        <div
          className="mt-14 flex flex-col items-center gap-5 animate-rise"
          style={{ animationDelay: "900ms" }}
        >
          <a href="#invitation" className="btn-solena">
            <span className="label-main">
              Enter the Ecosystem
              <span className="arrow">→</span>
            </span>
            <span className="label-hover">
              Cross the threshold
              <span className="arrow">→</span>
            </span>
          </a>
          <p className="text-[10px] tracking-eyebrow text-stone/40">Access is selective</p>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-[10px] tracking-eyebrow text-stone/40">
        <span>Descend</span>
        <span className="h-12 w-px bg-gradient-to-b from-stone/40 to-transparent" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Thesis() {
  return (
    <section id="thesis" className="relative py-40 lg:py-64 overflow-hidden section-edge">
      {/* dust field continuation */}
      <div className="absolute inset-0 -z-0 opacity-30">
        <ResponsiveArtwork
          desktop={vieLandscape}
          mobile={viePortrait}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/40 to-obsidian" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 text-[10px] tracking-eyebrow text-bronze/80 mb-8 reveal">
          <span>I</span>
          <span className="h-px w-12 bg-bronze/40" />
          <span>The Thesis</span>
        </div>

        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-ivory max-w-4xl reveal">
          Most organizations
          <br />
          compete for attention.
          <br />
          <span className="text-stone/60">Solena builds gravity.</span>
        </h2>

        <div className="mt-24 grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 lg:col-start-2 reveal reveal-delay-1">
            <p className="font-display text-2xl md:text-3xl text-ivory/90 leading-snug">
              Gravity does not advertise. It attracts.
            </p>
          </div>
          <div className="lg:col-span-5 space-y-6 text-stone/80 text-base md:text-lg leading-relaxed reveal reveal-delay-2">
            <p>It attracts capital that thinks long-term.</p>
            <p>It attracts founders who think in decades.</p>
            <p>It attracts institutions that outlive trends.</p>
            <p className="pt-6 text-ivory/90">
              We are not a service provider. We are an acceleration layer for legacy.
            </p>
          </div>
        </div>

        <div className="mt-32 flex items-center gap-6 reveal">
          <span className="h-px flex-1 bronze-line" />
          <p className="text-[11px] tracking-eyebrow text-stone/60">
            What we build cannot be commoditized
          </p>
          <span className="h-px flex-1 bronze-line" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const PILLARS = [
  {
    n: "01",
    title: "Culture",
    hover: "Brands people belong to, not buy.",
  },
  {
    n: "02",
    title: "Space",
    hover: "Architecture as identity.",
  },
  {
    n: "03",
    title: "Media",
    hover: "Narrative systems that compound influence.",
  },
  {
    n: "04",
    title: "Ventures",
    hover: "Businesses designed for decades.",
  },
];

function WhatWeBuild() {
  return (
    <section id="build" className="relative py-40 lg:py-56 overflow-hidden section-edge">
      <div className="absolute inset-0 opacity-20">
        <ResponsiveArtwork
          desktop={spiralLandscape}
          mobile={spiralPortrait}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 text-[10px] tracking-eyebrow text-bronze/80 mb-8 reveal">
          <span>II</span>
          <span className="h-px w-12 bg-bronze/40" />
          <span>What We Build</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-ivory max-w-3xl leading-[1.05] reveal">
          Four disciplines. <span className="text-stone/60">One field.</span>
        </h2>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} {...p} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  n,
  title,
  hover,
  delay,
}: {
  n: string;
  title: string;
  hover: string;
  delay: number;
}) {
  return (
    <div
      className={`reveal reveal-delay-${Math.min(delay + 1, 4)} group relative aspect-[3/4] glass overflow-hidden transition-all duration-500 hover:bg-white/[0.07] hover:-translate-y-2`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bronze/0 via-transparent to-bronze/0 group-hover:via-bronze/[0.08] transition-all duration-700" />
      <div className="relative h-full p-8 flex flex-col justify-between">
        <span className="text-[10px] tracking-eyebrow text-bronze/70">{n}</span>
        <div>
          <h3 className="font-display text-4xl md:text-5xl text-ivory mb-4">{title}</h3>
          <p className="text-sm text-stone/70 leading-relaxed opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            {hover}
          </p>
        </div>
      </div>
      <span className="absolute top-0 left-0 h-px w-0 bg-bronze/60 group-hover:w-full transition-all duration-700" />
    </div>
  );
}

/* ------------------------------------------------------------------ */

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

function Ecosystem() {
  const [active, setActive] = useState<number | null>(null);
  const positions = useMemo(() => {
    return SECTORS.map((_, i) => {
      const angle = (i / SECTORS.length) * Math.PI * 2 - Math.PI / 2;
      return { x: Math.cos(angle), y: Math.sin(angle) };
    });
  }, []);

  return (
    <section id="ecosystem" className="relative py-40 lg:py-56 overflow-hidden section-edge">
      {/* blueprint texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,240,232,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(244,240,232,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 text-[10px] tracking-eyebrow text-bronze/80 mb-8 reveal">
          <span>III</span>
          <span className="h-px w-12 bg-bronze/40" />
          <span>Ecosystem</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-ivory max-w-3xl leading-[1.05] reveal">
          Everything connects.
          <br />
          <span className="text-stone/60">Nothing operates alone.</span>
        </h2>

        <div className="mt-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 reveal reveal-delay-1">
            <div className="relative aspect-square max-w-[640px] mx-auto">
              {/* orbital rings */}
              {[0.55, 0.78, 1].map((s, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 rounded-full border border-ivory/[0.08]"
                  style={{
                    width: `${s * 100}%`,
                    height: `${s * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
              {/* center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-bronze/20 blur-3xl animate-pulse-slow" />
                  <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full glass-strong flex items-center justify-center">
                    <span className="font-display text-xl tracking-[0.4em]">SOLENA</span>
                  </div>
                </div>
              </div>
              {/* nodes */}
              {SECTORS.map((s, i) => {
                const { x, y } = positions[i];
                const isActive = active === i;
                return (
                  <button
                    key={s}
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      transform: `translate(calc(${x * 42}% - 50%), calc(${y * 42}% - 50%))`,
                    }}
                  >
                    <div
                      className={`h-14 w-14 sm:h-20 sm:w-20 rounded-full glass flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "scale-110 border-bronze/60 bg-white/[0.08]"
                          : "hover:scale-105"
                      }`}
                    >
                      <span className="text-[9px] sm:text-[10px] tracking-eyebrow text-ivory/80 text-center px-1 leading-tight">
                        {s}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8 reveal reveal-delay-2">
            <p className="text-[10px] tracking-eyebrow text-stone/50">Active sector</p>
            <p className="font-display text-4xl md:text-5xl text-ivory min-h-[3rem]">
              {active !== null ? SECTORS[active] : "—"}
            </p>
            <p className="text-stone/70 text-base leading-relaxed max-w-md">
              Solena sits at the center of converging sectors, where brand, built environment,
              culture, capital, and narrative architecture begin to move as a single field.
            </p>
            <div className="pt-4 flex items-center gap-3 text-[10px] tracking-eyebrow text-stone/40">
              <span className="h-px w-8 bg-stone/30" />
              <span>Hover to navigate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const STANDARDS = [
  ["We do not optimize for speed.", "We optimize for permanence."],
  ["We do not follow trends.", "We define signals."],
  ["We do not build for markets.", "We build for memory."],
  ["We do not design for visibility.", "We design for inevitability."],
];

function Standard() {
  return (
    <section className="relative py-48 lg:py-72 bg-obsidian-2 section-edge">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 text-[10px] tracking-eyebrow text-bronze/80 mb-20 reveal">
          <span>IV</span>
          <span className="h-px w-12 bg-bronze/40" />
          <span>The Standard</span>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {STANDARDS.map(([a, b], i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="font-display text-3xl md:text-5xl lg:text-6xl text-stone/40 leading-tight">
                {a}
              </p>
              <p className="font-display text-3xl md:text-5xl lg:text-6xl text-ivory leading-tight mt-3">
                {b}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-40 pt-16 border-t border-ivory/10 reveal">
          <p className="font-display text-3xl md:text-5xl lg:text-6xl text-ivory/90 leading-tight max-w-4xl">
            If it cannot exist for decades,
            <br />
            <span className="text-bronze-glow/90">we do not build it.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const TRANSFORMS = [
  ["A brand", "A category authority"],
  ["A property", "A destination"],
  ["A concept", "A cultural signal"],
  ["A business", "A legacy asset"],
];

function Transformations() {
  return (
    <section className="relative py-40 lg:py-56 overflow-hidden section-edge">
      <div className="absolute inset-0 opacity-25">
        <ResponsiveArtwork
          desktop={g01Landscape}
          mobile={g01Portrait}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/30 to-obsidian" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-4 text-[10px] tracking-eyebrow text-bronze/80 mb-8 reveal">
          <span>V</span>
          <span className="h-px w-12 bg-bronze/40" />
          <span>Transformations</span>
        </div>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-ivory max-w-3xl leading-[1.05] reveal">
          We do not execute projects.
          <br />
          <span className="text-stone/60">We shift states.</span>
        </h2>

        <div className="mt-24 divide-y divide-ivory/10 border-y border-ivory/10">
          {TRANSFORMS.map(([from, to], i) => (
            <div
              key={i}
              className="reveal grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 py-10 md:py-14 group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <p className="font-display text-3xl md:text-4xl text-stone/50 md:text-right transition-colors group-hover:text-stone/80">
                {from}
              </p>
              <span className="hidden md:block text-bronze/70 text-2xl px-6 transition-transform group-hover:translate-x-1">
                →
              </span>
              <span className="md:hidden text-bronze/70 text-xl">↓</span>
              <p className="font-display text-3xl md:text-4xl text-ivory transition-colors">
                {to}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const ARTICLES = [
  { n: "01", title: "The Architecture of Gravity", read: "On why some brands attract and others chase." },
  { n: "02", title: "Luxury as Infrastructure", read: "Building the substrate beneath desire." },
  { n: "03", title: "Why Most Brands Disappear", read: "Distribution is not the same as memory." },
  { n: "04", title: "Cultural Compounding", read: "The mathematics of relevance over decades." },
  { n: "05", title: "Designing for the Next Century", read: "Notes from a longer time horizon." },
];

function Journal() {
  return (
    <section id="journal" className="relative py-40 lg:py-56 section-edge">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between flex-wrap gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 text-[10px] tracking-eyebrow text-bronze/80 mb-6 reveal">
              <span>VI</span>
              <span className="h-px w-12 bg-bronze/40" />
              <span>The Journal</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-ivory max-w-2xl leading-[1.05] reveal">
              Ideas before they
              <br />
              become industries.
            </h2>
          </div>
          <p className="text-[10px] tracking-eyebrow text-stone/40 reveal">Private intelligence</p>
        </div>

        <div className="border-t border-ivory/10">
          {ARTICLES.map((a, i) => (
            <a
              key={a.n}
              href="#"
              className="reveal group block border-b border-ivory/10 py-8 md:py-10 transition-colors hover:bg-white/[0.02]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-6 md:gap-12">
                <span className="font-display text-stone/40 text-xl w-10">{a.n}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl md:text-4xl text-ivory truncate">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone/60 max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500">
                    {a.read}
                  </p>
                </div>
                <span className="text-[10px] tracking-eyebrow text-stone/40 group-hover:text-bronze-glow transition-colors whitespace-nowrap">
                  Read the pre-language →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Future() {
  const isDesktop = useIsDesktop();
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden section-edge">
      <div className="absolute inset-0">
        {/* video if available, else image */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={isDesktop ? g01Landscape.url : g01Portrait.url}
          className="w-full h-full object-cover"
        >
          <source
            src={isDesktop ? new URL("@/assets/g-01.mp4.asset.json", import.meta.url).pathname : ""}
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/55 to-obsidian" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 lg:px-12 py-32">
        <div className="flex items-center gap-4 text-[10px] tracking-eyebrow text-bronze/80 mb-12 reveal">
          <span>VII</span>
          <span className="h-px w-12 bg-bronze/40" />
          <span>Solena 2035</span>
        </div>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory leading-[1.02] max-w-4xl reveal">
          We are not building
          <br />
          a company.
          <br />
          <span className="text-stone/60">
            We are building an ecosystem
            <br />
            of institutions.
          </span>
        </h2>

        <ul className="mt-20 grid sm:grid-cols-2 lg:grid-cols-5 gap-4 reveal reveal-delay-1">
          {[
            "Cultural institutions",
            "Luxury developments",
            "Media architecture",
            "Venture systems",
            "Design laboratories",
          ].map((x, i) => (
            <li
              key={x}
              className="glass px-5 py-6 text-sm tracking-wide text-ivory/80"
            >
              <span className="block text-[10px] tracking-eyebrow text-bronze/70 mb-3">
                0{i + 1}
              </span>
              {x}
            </li>
          ))}
        </ul>

        <p className="mt-24 font-display text-3xl md:text-5xl text-ivory/90 reveal reveal-delay-2">
          The present is just the prototype.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Invitation() {
  return (
    <section id="invitation" className="relative py-48 lg:py-72 bg-obsidian">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <div className="flex items-center justify-center gap-4 text-[10px] tracking-eyebrow text-bronze/80 mb-12 reveal">
          <span className="h-px w-10 bg-bronze/40" />
          <span>VIII · Invitation</span>
          <span className="h-px w-10 bg-bronze/40" />
        </div>

        <h2 className="font-display text-5xl md:text-7xl text-ivory leading-[1.04] reveal">
          Access is not open.
          <br />
          <span className="text-stone/60">It is aligned.</span>
        </h2>

        <p className="mt-12 text-stone/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed reveal reveal-delay-1">
          We work with those building beyond cycles. Founders. Institutions. Architects.
          Investors. Cultural builders.
        </p>

        <div className="mt-16 flex flex-col items-center gap-5 reveal reveal-delay-2">
          <a href="mailto:access@solena.studio" className="btn-solena">
            <span className="label-main">
              Request Access
              <span className="arrow">→</span>
            </span>
            <span className="label-hover">
              Signal alignment
              <span className="arrow">→</span>
            </span>
          </a>
          <p className="text-[10px] tracking-eyebrow text-stone/40">
            Not everyone will be reviewed
          </p>
        </div>

        <p className="mt-24 font-display text-xl md:text-2xl text-stone/60 italic max-w-2xl mx-auto reveal reveal-delay-3">
          “If Solena is relevant to your trajectory, you will know before we respond.”
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-ivory/10 py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-center">
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="Solena" className="h-8 w-8 opacity-80" />
          <span className="font-display tracking-[0.4em] text-ivory/80">SOLENA</span>
        </div>
        <p className="text-[10px] tracking-eyebrow text-stone/40 text-center">
          Engineering legacy · Est. MMXXV
        </p>
        <p className="text-[10px] tracking-eyebrow text-stone/40 md:text-right">
          access@solena.studio
        </p>
      </div>
    </footer>
  );
}
