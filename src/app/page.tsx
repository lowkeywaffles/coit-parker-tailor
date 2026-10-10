"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MapPin, NavigationArrow, Phone, Scissors, X } from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { Reveal, Wrap, flipTheme, type Hours } from "@/components/kit";
import { Faq, HoursTable, MapFrame, useDark, useStatus } from "@/components/blocks";
import { T, useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const TEL = "tel:+19725991595", PHONE = "(972) 599-1595";
const DIR = "https://www.google.com/maps/dir/?api=1&destination=3304+Coit+Rd+Plano+TX+75023";
const HOURS: Hours = { 0: null, 1: [10, 18.5], 2: [10, 18.5], 3: [10, 18.5], 4: [10, 18.5], 5: [10, 18.5], 6: [10, 17.5] };
const PIECES = ["s1", "s2", "s3", "s4", "s5", "s6"];
const ROT = ["-1.2deg", "0.8deg", "-0.4deg", "1deg", "-0.8deg", "0.5deg"];

const btn = "inline-flex items-center justify-center gap-2.5 rounded-md px-6 py-3.5 text-[15px] font-extrabold transition-[transform,background-color] duration-300 ease-spring hover:-translate-y-0.5 active:scale-[.97]";
const primary = cn(btn, "bg-btn text-btnfg shadow-[0_14px_30px_-16px_var(--shadow)]");
const ghost = cn(btn, "bg-card text-ink shadow-[inset_0_0_0_1px_var(--line)]");
const eyebrow = "mb-3 inline-flex items-center gap-2.5 text-xs font-extrabold tracking-[.2em] text-soft uppercase before:w-6 before:border-t-2 before:border-dashed before:border-chalk";

/** Language: a tape measure; the tape pulls out to show the language. */
function Tape() {
  const { lang, setLang } = useLang();
  const es = lang === "es";
  return (
    <button type="button" onClick={() => setLang(es ? "en" : "es")} aria-label={es ? "Switch to English" : "Cambiar a español"} className="relative h-10 w-24 flex-none cursor-pointer">
      <motion.span key={lang} initial={{ scaleX: 0.2 }} animate={{ scaleX: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="absolute top-[13px] left-7 h-4 w-16 origin-left overflow-hidden rounded-e-[3px] bg-[#f6d873] bg-[repeating-linear-gradient(90deg,#23303b_0_1px,transparent_1px_6px)] bg-[length:100%_4px] bg-no-repeat rtl:right-7 rtl:left-auto rtl:origin-right">
        <b className="absolute top-[3px] right-1.5 text-[10px] leading-none font-extrabold tracking-wide text-[#23303b]">{lang.toUpperCase()}</b>
      </motion.span>
      <span className="absolute top-0.5 left-0 z-10 grid size-9 place-items-center rounded-[10px] bg-tape shadow-[inset_0_-3px_0_rgba(0,0,0,.15)] after:size-3 after:rounded-full after:bg-[#23303b] after:shadow-[0_0_0_3px_rgba(255,255,255,.35)] rtl:right-0 rtl:left-auto" />
    </button>
  );
}

/** Theme: a triangle of tailor's chalk that flips over; red on paper, white on the chalkboard. */
function Chalk() {
  const { dark, setTheme } = useDark();
  const { lang } = useLang();
  return (
    <button type="button" aria-label={lang === "es" ? "Cambiar modo oscuro" : "Toggle dark mode"} aria-pressed={dark}
      onClick={e => flipTheme(e.currentTarget, () => flushSync(() => setTheme(dark ? "light" : "dark")))}
      className="grid size-11 flex-none cursor-pointer place-items-center rounded-full bg-card shadow-[inset_0_0_0_1px_var(--line)]">
      <motion.svg viewBox="0 0 28 28" className="size-7" animate={{ rotate: dark ? 180 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} aria-hidden="true">
        <path d="M4 22 14 4l10 18z" className="transition-[fill] duration-500" fill={dark ? "#f2efe6" : "#e2574c"} />
        <path d="M6 25h16" stroke="var(--soft)" strokeWidth="1.6" strokeDasharray="3 2" />
      </motion.svg>
    </button>
  );
}

/** Hero: a bodice pattern piece. The cutting line draws itself, then the fitting notes are written in. */
function Draft() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".paper", { opacity: 0, scale: 0.9, transformOrigin: "50% 50%", duration: 0.8, ease: "power3.out" })
        .fromTo(".draw", { strokeDasharray: 1200, strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut", stagger: 0.25 }, "-=0.3")
        .from(".anno", { opacity: 0, y: 8, stagger: 0.3, duration: 0.5 }, "-=0.8")
        .from(".pin", { scale: 0, transformOrigin: "50% 50%", stagger: 0.12, ease: "back.out(3)", duration: 0.4 }, "-=0.6");
    });
  }, { scope: ref });
  return (
    <div ref={ref} className="relative aspect-square w-full max-w-[480px]" aria-hidden="true">
      <svg viewBox="0 0 400 400" className="size-full overflow-visible drop-shadow-[0_30px_40px_var(--shadow)]">
        <path className="paper" d="M70 60 L170 50 C175 80 200 95 230 92 L240 60 L300 70 L320 150 L290 160 L300 330 L80 340 L95 160 L60 150 Z" fill="var(--paper)" stroke="var(--paper-line)" strokeWidth="2" />
        <path className="march" d="M70 60 L170 50 C175 80 200 95 230 92 L240 60 L300 70 L320 150 L290 160 L300 330 L80 340 L95 160 L60 150 Z" fill="none" stroke="var(--mark)" strokeWidth="2" />
        <path className="draw" d="M190 140 V290 M182 152 L190 140 L198 152 M182 278 L190 290 L198 278" stroke="var(--mark)" strokeWidth="2" fill="none" />
        <path className="draw" d="M140 340 L150 250 L160 340 M240 336 L232 250 L222 337" stroke="var(--chalk)" strokeWidth="2" fill="none" />
        <path d="M92 230 l-10 4 M300 230 l10 4" stroke="var(--mark)" strokeWidth="3" />
        <path className="draw" d="M250 352 C270 360 280 362 290 356" stroke="var(--chalk)" strokeWidth="2" fill="none" />
        <g className="font-hand" fill="var(--chalk-text)" fontSize="24" fontWeight="700">
          <text className="anno" x="10" y="40">hem +1 ½&quot;</text>
          <text className="anno" x="262" y="40">take in ¾&quot;</text>
          <text className="anno" x="300" y="380" textAnchor="middle">✓ fits</text>
        </g>
        <g stroke="#7a8a95" strokeWidth="2"><path className="pin" d="M110 110l26 18" /><path className="pin" d="M262 118l-24 22" /></g>
        <circle className="pin" cx="110" cy="110" r="5" fill="var(--chalk)" /><circle className="pin" cx="262" cy="118" r="5" fill="#e9b232" />
      </svg>
    </div>
  );
}

export default function Home() {
  const t = useT();
  const status = useStatus(HOURS);
  const [hover, setHover] = useState(-1);

  return (
    <>
      <header className="pointer-events-none sticky top-3 z-40 px-4">
        <nav className="glass pointer-events-auto mx-auto flex h-[70px] max-w-[1160px] items-center justify-between gap-3 rounded-xl border border-line ps-3 pe-2.5 shadow-[inset_0_1px_0_var(--hi),0_20px_50px_-28px_var(--shadow)]">
          <a href="#top" className="flex flex-none items-center gap-2.5" aria-label="Parker Tailor">
            <span className="grid size-[42px] place-items-center rounded-[10px] bg-[#23303b] text-[#e2574c]"><Scissors size={22} weight="bold" /></span>
            <span><b className="block font-display text-2xl leading-none font-medium">Parker Tailor</b><T k="logoSub" className="mt-0.5 block text-[11px] font-extrabold tracking-[.16em] text-soft uppercase max-sm:hidden" /></span>
          </a>
          <div className="flex items-center gap-1 text-[15px] font-bold max-[900px]:hidden">
            {[["services", "navServices"], ["visit", "navVisit"]].map(([id, k]) => <a key={id} href={`#${id}`} className="rounded-md px-4 py-2 text-soft transition-colors hover:bg-bg2 hover:text-ink" dangerouslySetInnerHTML={{ __html: t(k) }} />)}
          </div>
          <div className="flex items-center gap-3">
            <Tape /><Chalk />
            <a href={TEL} className={cn(primary, "px-5 py-2.5 max-sm:hidden")}><Phone size={17} weight="bold" />{PHONE}</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative pt-16 pb-24 max-sm:pt-10">
          <Wrap className="grid grid-cols-[1.05fr_.95fr] items-center gap-12 max-[960px]:grid-cols-1">
            <div>
              <Reveal>
                <span className="mb-6 inline-flex items-center gap-2 rounded bg-card px-3 py-1.5 text-sm font-bold shadow-[inset_0_0_0_1px_var(--line)]">
                  <i className={cn("size-2 rounded-full", status.open ? "bg-[#22a35a] shadow-[0_0_0_4px_rgba(34,163,90,.2)]" : "bg-[#9aa6ad]")} />{status.text || " "}
                </span>
              </Reveal>
              <Reveal delay={0.08}><T k="heroTitle" as="h1" className="mb-6 text-[clamp(52px,7vw,100px)]" /></Reveal>
              <Reveal delay={0.16}><T k="heroLead" as="p" className="mb-9 max-w-[48ch] text-lg text-soft" /></Reveal>
              <Reveal delay={0.24} className="mb-10 flex flex-wrap gap-3">
                <a href={TEL} className={primary}><Phone size={18} weight="bold" /><T k="ctaCall" /></a>
                <a href={DIR} target="_blank" rel="noopener" className={ghost}><NavigationArrow size={18} weight="bold" /><T k="ctaDir" /></a>
              </Reveal>
              <Reveal delay={0.3} className="flex flex-wrap gap-3">
                {[["4.7★", "st1"], ["2007", "st2"]].map(([n, k]) => (
                  <div key={k} className="rounded-md bg-card px-5 py-3.5 shadow-[inset_0_0_0_1px_var(--line)]"><b className="block font-display text-[34px] leading-none font-medium">{n}</b><T k={k} className="text-[13px] font-semibold text-soft" /></div>
                ))}
              </Reveal>
            </div>
            <Reveal delay={0.1} className="w-full max-w-[480px] justify-self-end max-[960px]:justify-self-center"><Draft /></Reveal>
          </Wrap>
        </section>

        <section id="services" className="scroll-mt-24 bg-bg2/90 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-14 max-w-[720px]"><T k="svcEyebrow" className={eyebrow} /><T k="svcTitle" as="h2" className="mb-4 text-[clamp(44px,5.8vw,78px)]" /><T k="svcLead" as="p" className="max-w-[58ch] text-[17px] text-soft" /></Reveal>
            <div className="grid grid-cols-3 gap-5 max-[960px]:grid-cols-2 max-sm:grid-cols-1">
              {PIECES.map((k, i) => (
                <Reveal key={k} delay={(i % 3) * 0.07}>
                  <motion.div onHoverStart={() => setHover(i)} onHoverEnd={() => setHover(-1)}
                    animate={{ rotate: hover === i ? "0deg" : ROT[i], y: hover === i ? -6 : 0 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="piece relative h-full p-8 pb-16">
                    <T k={`n${i + 1}`} className="mb-3 block font-hand text-[22px] leading-none font-bold text-chalktext" />
                    <T k={`${k}t`} as="h3" className="mb-2 text-[30px]" />
                    <T k={`${k}p`} as="p" className="text-[15px] text-soft" />
                    <svg viewBox="0 0 14 54" className="absolute right-6 bottom-5 h-[54px] w-3.5 text-mark opacity-55" aria-hidden="true"><path d="M7 2v50M2 10l5-8 5 8M2 44l5 8 5-8" stroke="currentColor" fill="none" strokeWidth="1.5" /></svg>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12 max-w-[720px]"><T k="whyEyebrow" className={eyebrow} /><T k="whyTitle" as="h2" className="text-[clamp(44px,5.8vw,78px)]" /></Reveal>
            <Reveal className="relative grid grid-cols-[auto_1fr] items-center gap-14 overflow-hidden rounded-xl bg-card p-12 shadow-[inset_0_0_0_1px_var(--line),0_40px_80px_-50px_var(--shadow)] max-[800px]:grid-cols-1 max-sm:p-7">
              <BorderBeam size={200} duration={12} colorFrom="#e2574c" colorTo="#e9b232" borderWidth={1.5} />
              <div><b className="block font-display text-[120px] leading-none font-medium">4.7</b><T k="qSub" className="mt-1 block max-w-[20ch] text-sm font-bold text-soft" /></div>
              <ul className="grid gap-4">
                {["l1", "l2", "l3", "l4"].map(k => <li key={k} className="flex items-baseline gap-3.5 text-[18px]"><X size={16} weight="bold" className="flex-none translate-y-0.5 text-chalktext" /><T k={k} /></li>)}
              </ul>
            </Reveal>
          </Wrap>
        </section>

        <section id="visit" className="scroll-mt-24 bg-bg2/90 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12"><T k="visitEyebrow" className={eyebrow} /><T k="visitTitle" as="h2" className="text-[clamp(44px,5.8vw,78px)]" /></Reveal>
            <div className="grid grid-cols-[.9fr_1.1fr] gap-5 max-[960px]:grid-cols-1">
              <Reveal className="piece relative grid content-start gap-5 p-9">
                <T k="hoursTitle" as="h3" className="text-[36px]" />
                <HoursTable hours={HOURS} accent="text-chalktext font-bold" />
                {([[TEL, Phone, PHONE, "callSub"], [DIR, MapPin, "3304 Coit Rd", null]] as const).map(([href, I, strong, sub]) => (
                  <a key={strong} href={href} target={sub ? undefined : "_blank"} rel="noopener" className="group relative z-10 flex items-start gap-3.5">
                    <span className="grid size-11 flex-none place-items-center rounded-md bg-btn text-btnfg transition-transform duration-300 ease-spring group-hover:scale-110"><I size={20} weight="bold" /></span>
                    <span><strong className="block">{strong}</strong>{sub ? <T k={sub} className="text-sm text-soft" /> : <span className="text-sm text-soft">Plano, TX 75023</span>}</span>
                  </a>
                ))}
              </Reveal>
              <Reveal delay={0.08} className="min-h-[440px] overflow-hidden rounded-xl shadow-[inset_0_0_0_1px_var(--line)]"><MapFrame q="3304+Coit+Rd,+Plano,+TX+75023" className="min-h-[440px]" /></Reveal>
            </div>
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap className="grid grid-cols-[.8fr_1.2fr] gap-14 max-[960px]:grid-cols-1">
            <Reveal><T k="faqEyebrow" className={eyebrow} /><T k="faqTitle" as="h2" className="text-[clamp(44px,5.8vw,74px)]" /></Reveal>
            <Faq ids={[1, 2, 3]} accent="text-chalktext" item="rounded-lg bg-card shadow-[inset_0_0_0_1px_var(--line)]" />
          </Wrap>
        </section>

        <section className="pb-32 max-sm:pb-20">
          <Wrap>
            <Reveal className="relative flex items-center justify-between gap-8 overflow-hidden rounded-xl bg-[#23303b] px-14 py-20 text-[#f2efe6] max-[960px]:flex-col max-[960px]:items-start max-sm:px-7 max-sm:py-14">
              <div><T k="ctaNote" className="mb-2 block font-hand text-[30px] leading-none font-bold text-[#ff9c92]" /><T k="ctaTitle" as="h2" className="text-[clamp(52px,7vw,100px)]" /></div>
              <a href={TEL} className={cn(btn, "flex-none bg-[#e2574c] px-8 py-4 text-lg text-white")}><Phone size={20} weight="bold" />{PHONE}</a>
              <svg className="pointer-events-none absolute inset-x-0 bottom-6 h-3 w-full" aria-hidden="true"><line x1="0" y1="6" x2="100%" y2="6" stroke="#e9b232" strokeWidth="3" strokeDasharray="10 8" /></svg>
            </Reveal>
          </Wrap>
        </section>
      </main>

      <footer className="pb-28 text-sm text-soft">
        <Wrap><div className="flex flex-wrap justify-between gap-3.5 border-t border-line pt-6"><span>© {new Date().getFullYear()} Parker Tailor (Coit Parker Tailor Shop) · 3304 Coit Rd, Plano, TX 75023</span><a href={TEL}>{PHONE}</a></div></Wrap>
      </footer>
      <div className="glass fixed inset-x-3 bottom-3 z-30 hidden gap-2 rounded-xl p-1.5 shadow-[inset_0_0_0_1px_var(--line)] max-sm:flex">
        <a href={TEL} className={cn(primary, "flex-1 py-3")}><T k="barCall" /></a>
        <a href={DIR} target="_blank" rel="noopener" className={cn(ghost, "flex-1 py-3")}><T k="barDir" /></a>
      </div>
    </>
  );
}
