"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
} from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useState, type PointerEvent } from "react";
import styles from "./PortfolioPage.module.css";

type Language = "en" | "uk";
type PortfolioContent = {
  nav: { about: string; experience: string; stack: string; contact: string };
  eyebrow: string;
  headline: readonly [string, string];
  role: string;
  intro: string;
  primaryCta: string;
  resumeCta: string;
  location: string;
  relocation: string;
  experienceYears: string;
  visualLabel: string;
  requests: string;
  visualNote: string;
  signal: string;
  aboutLabel: string;
  aboutTitle: string;
  aboutText: string;
  strengths: Array<{ number: string; title: string; text: string }>;
  metricsLabel: string;
  metrics: Array<{ value: string; label: string }>;
  performanceLabel: string;
  performance: Array<{ from: string; to: string; label: string }>;
  performanceVitals: Array<{ value: string; label: string }>;
  experienceLabel: string;
  experienceTitle: string;
  currentRole: string;
  present: string;
  evoBullets: string[];
  leagueRole: string;
  leagueBullets: string[];
  stackLabel: string;
  stackTitle: string;
  stackGroups: Array<{ title: string; items: string[] }>;
  workStyleLabel: string;
  workStyleTitle: string;
  workStyleText: string;
  workStyleFacts: string[];
  educationLabel: string;
  educationTitle: string;
  degree: string;
  university: string;
  languagesLabel: string;
  languages: string;
  contactLabel: string;
  contactTitle: string;
  contactText: string;
  emailCta: string;
  linkedin: string;
  github: string;
  backTop: string;
  footerNote: string;
  cardLabels: string[];
};

const content = {
  en: {
    nav: { about: "About", experience: "Experience", stack: "Stack", contact: "Contact" },
    eyebrow: "Senior frontend engineer · Kyiv, Ukraine",
    headline: ["Dmytro", "Rudniev"] as const,
    role: "I build frontend systems that scale—and help teams ship with confidence.",
    intro:
      "7+ years across product architecture and delivery. Improved Lighthouse from ~60 to ~90, helped a shared component library reach ~50 products, and supported systems handling ~100M monthly requests.",
    primaryCta: "Let’s talk",
    resumeCta: "Download résumé",
    location: "Kyiv, Ukraine",
    relocation: "Open to relocation in the USA",
    experienceYears: "7+ years",
    visualLabel: "Production scale",
    requests: "requests / month",
    visualNote: "Reliable frontend foundations for products with real-world traffic.",
    signal: "Built for the long run",
    aboutLabel: "The value I bring",
    aboutTitle: "Engineering that moves the whole product forward.",
    aboutText:
      "I connect thoughtful frontend architecture with outcomes people can measure: faster experiences, consistent interfaces, and teams that can ship confidently.",
    strengths: [
      {
        number: "01",
        title: "Systems thinking",
        text: "Architecture decisions across dozens of services, with patterns teams can reuse instead of reinventing.",
      },
      {
        number: "02",
        title: "Performance with proof",
        text: "Lighthouse moved from about 60 to 90; Largest Contentful Paint improved from about 5.5s to 3s.",
      },
      {
        number: "03",
        title: "A multiplier for teams",
        text: "A shared component library used by about 50 applications, plus reviews and mentoring that raise the bar.",
      },
    ],
    metricsLabel: "Selected outcomes",
    metrics: [
      { value: "~20K", label: "monthly active users" },
      { value: "~50", label: "products using a shared UI library" },
      { value: "~100M", label: "requests handled each month" },
    ],
    performanceLabel: "Performance, made visible",
    performance: [
      { from: "~60", to: "~90", label: "Lighthouse performance" },
      { from: "~5.5s", to: "~3s", label: "Largest Contentful Paint" },
      { from: "~0%", to: "~40%", label: "Jest unit-test coverage" },
    ],
    performanceVitals: [
      { value: "<0.05", label: "Cumulative Layout Shift" },
      { value: "~2s", label: "First Contentful Paint" },
      { value: ">10", label: "production incidents resolved" },
    ],
    experienceLabel: "The work behind the numbers",
    experienceTitle: "Experience",
    currentRole: "Frontend Developer · senior-level responsibilities",
    present: "Present",
    evoBullets: [
      "Led frontend architecture for applications serving around 20K monthly active users, using Vue.js, TypeScript, GraphQL, and REST.",
      "Created a reusable component library adopted by about 50 products; improved Lighthouse performance from ~60 to ~90 and LCP from ~5.5s to ~3s.",
      "Raised Jest coverage from near zero to ~40%, migrated about 20 JavaScript modules to TypeScript, and reduced GraphQL payload by ~10%.",
      "Reviewed ~200 pull requests, mentored two engineers, resolved around 10 production incidents, and helped save ~20 engineering hours each month with internal tools and AI workflows.",
    ],
    leagueRole: "Frontend Developer",
    leagueBullets: [
      "Delivered 200+ responsive landing pages and marketing websites.",
      "Built WordPress solutions with PHP and Advanced Custom Fields; implemented SEO improvements and analytics integrations.",
    ],
    stackLabel: "Tools I work with",
    stackTitle: "A practical, end-to-end toolkit.",
    stackGroups: [
      {
        title: "Frontend",
        items: ["TypeScript", "JavaScript", "React", "Next.js", "Vue.js", "Vuex"],
      },
      {
        title: "UI engineering",
        items: ["HTML5", "CSS3", "SCSS", "Tailwind CSS", "Storybook", "Design systems"],
      },
      {
        title: "APIs & quality",
        items: ["GraphQL", "REST", "Jest", "Playwright", "Cypress", "Request caching"],
      },
      {
        title: "Delivery & insight",
        items: ["Docker", "Kubernetes", "Google Cloud", "Cloudflare", "CI/CD", "Grafana", "Sentry"],
      },
    ],
    workStyleLabel: "How I work",
    workStyleTitle: "Make the whole team more effective.",
    workStyleText:
      "I work across disciplines, write down the reasoning behind technical choices, and look for small improvements that compound across releases.",
    workStyleFacts: [
      "Partnered with ~150 engineers across frontend, backend, QA, and DevOps.",
      "Worked in Agile teams spanning three time zones.",
      "Contributed to ~50 production releases per year and CI/CD improvements.",
    ],
    educationLabel: "Education & languages",
    educationTitle: "Curiosity beyond the browser.",
    degree: "Master’s degree in Electric Power Engineering",
    university: "Igor Sikorsky Kyiv Polytechnic Institute",
    languagesLabel: "Languages",
    languages: "English · Ukrainian · Russian",
    contactLabel: "Have a product challenge in mind?",
    contactTitle: "Let’s make the next release better.",
    contactText:
      "I’m open to senior frontend engineering opportunities where thoughtful architecture and execution make a measurable difference.",
    emailCta: "Email Dmytro",
    linkedin: "LinkedIn",
    github: "GitHub",
    backTop: "Back to top",
    footerNote: "Built with care, in Kyiv.",
    cardLabels: ["Vue.js", "TypeScript", "GraphQL", "Design systems"],
  },
  uk: {
    nav: { about: "Про мене", experience: "Досвід", stack: "Технології", contact: "Контакт" },
    eyebrow: "Senior Frontend Engineer · Київ, Україна",
    headline: ["Дмитро", "Руднєв"] as const,
    role: "Створюю фронтенд-системи, що масштабуються, і допомагаю командам впевнено випускати продукти.",
    intro:
      "Понад 7 років у розробці архітектури та продуктів. Покращив Lighthouse приблизно з 60 до 90, допоміг масштабувати спільну бібліотеку компонентів до ~50 продуктів і підтримував системи з ~100 млн запитів на місяць.",
    primaryCta: "Обговорімо співпрацю",
    resumeCta: "Завантажити резюме",
    location: "Київ, Україна",
    relocation: "Відкритий до переїзду у США",
    experienceYears: "7+ років",
    visualLabel: "Виробниче навантаження",
    requests: "запитів / місяць",
    visualNote: "Надійна фронтенд-основа для продуктів зі справжнім навантаженням.",
    signal: "Зроблено із запасом на майбутнє",
    aboutLabel: "Моя цінність",
    aboutTitle: "Інженерія, що рухає вперед увесь продукт.",
    aboutText:
      "Поєдную продуману фронтенд-архітектуру з вимірюваними результатами: швидшим досвідом, узгодженими інтерфейсами та впевненою роботою команди.",
    strengths: [
      {
        number: "01",
        title: "Системне мислення",
        text: "Архітектурні рішення для десятків сервісів і шаблони, які команда перевикористовує замість того, щоб щоразу починати спочатку.",
      },
      {
        number: "02",
        title: "Вимірювана швидкодія",
        text: "Показник Lighthouse зріс приблизно з 60 до 90, а Largest Contentful Paint скоротився з ~5,5 с до 3 с.",
      },
      {
        number: "03",
        title: "Посилення команди",
        text: "Спільна бібліотека компонентів для ~50 застосунків, рев’ю та наставництво, які підвищують якість роботи.",
      },
    ],
    metricsLabel: "Ключові результати",
    metrics: [
      { value: "~20 тис.", label: "активних користувачів щомісяця" },
      { value: "~50", label: "продуктів зі спільною UI-бібліотекою" },
      { value: "~100 млн", label: "запитів щомісяця" },
    ],
    performanceLabel: "Швидкодія в цифрах",
    performance: [
      { from: "~60", to: "~90", label: "продуктивність Lighthouse" },
      { from: "~5,5 с", to: "~3 с", label: "Largest Contentful Paint" },
      { from: "~0%", to: "~40%", label: "покриття Jest-тестами" },
    ],
    performanceVitals: [
      { value: "<0,05", label: "Cumulative Layout Shift" },
      { value: "~2 с", label: "First Contentful Paint" },
      { value: ">10", label: "вирішених інцидентів у production" },
    ],
    experienceLabel: "Досвід за результатами",
    experienceTitle: "Досвід",
    currentRole: "Frontend Developer · обов’язки рівня Senior",
    present: "дотепер",
    evoBullets: [
      "Вів фронтенд-архітектуру застосунків для ~20 тис. активних користувачів щомісяця на Vue.js, TypeScript, GraphQL і REST.",
      "Створив бібліотеку компонентів для ~50 продуктів; підняв Lighthouse приблизно з 60 до 90, а LCP скоротив з ~5,5 с до ~3 с.",
      "Збільшив покриття Jest-тестами майже з нуля до ~40%, переніс близько 20 JavaScript-модулів на TypeScript та зменшив GraphQL payload на ~10%.",
      "Перевірив ~200 pull request-ів, наставляв двох інженерів, усунув близько 10 інцидентів і допоміг заощаджувати ~20 інженерних годин на місяць завдяки внутрішнім інструментам та AI-workflow.",
    ],
    leagueRole: "Frontend Developer",
    leagueBullets: [
      "Створив понад 200 адаптивних лендингів і маркетингових сайтів.",
      "Розробляв рішення на WordPress із PHP та Advanced Custom Fields, покращував SEO й інтегрував аналітику.",
    ],
    stackLabel: "Мій інструментарій",
    stackTitle: "Практичний стек від інтерфейсу до продакшену.",
    stackGroups: [
      {
        title: "Frontend",
        items: ["TypeScript", "JavaScript", "React", "Next.js", "Vue.js", "Vuex"],
      },
      {
        title: "Розробка інтерфейсів",
        items: ["HTML5", "CSS3", "SCSS", "Tailwind CSS", "Storybook", "Design systems"],
      },
      {
        title: "API та якість",
        items: ["GraphQL", "REST", "Jest", "Playwright", "Cypress", "Request caching"],
      },
      {
        title: "Delivery та моніторинг",
        items: ["Docker", "Kubernetes", "Google Cloud", "Cloudflare", "CI/CD", "Grafana", "Sentry"],
      },
    ],
    workStyleLabel: "Мій підхід",
    workStyleTitle: "Підвищувати ефективність усієї команди.",
    workStyleText:
      "Працюю між напрямами, фіксую аргументи на користь технічних рішень і шукаю невеликі покращення, що накопичують ефект від релізу до релізу.",
    workStyleFacts: [
      "Співпрацював приблизно зі 150 інженерами з frontend, backend, QA та DevOps.",
      "Працював в Agile-командах у трьох часових поясах.",
      "Долучався до ~50 релізів на рік і покращень CI/CD.",
    ],
    educationLabel: "Освіта та мови",
    educationTitle: "Цікавість за межами браузера.",
    degree: "Магістр з електроенергетики",
    university: "Київський політехнічний інститут імені Ігоря Сікорського",
    languagesLabel: "Мови",
    languages: "Англійська · українська · російська",
    contactLabel: "Є складне завдання для продукту?",
    contactTitle: "Зробімо наступний реліз кращим.",
    contactText:
      "Відкритий до пропозицій Senior Frontend Engineer, де продумана архітектура та якісна реалізація дають вимірюваний результат.",
    emailCta: "Написати Дмитру",
    linkedin: "LinkedIn",
    github: "GitHub",
    backTop: "На початок",
    footerNote: "Створено в Києві з увагою до деталей.",
    cardLabels: ["Vue.js", "TypeScript", "GraphQL", "Дизайн-системи"],
  },
} satisfies Record<Language, PortfolioContent>;

const skillKeys = ["TypeScript", "JavaScript", "React", "Next.js", "Vue.js", "GraphQL"];
const achievementHighlightPattern =
  /(?:\b(?:Vue\.js|TypeScript|GraphQL|REST|Jest|JavaScript|WordPress|PHP|SEO|Lighthouse|Advanced Custom Fields)\b|(?:~\s?|around\s+|about\s+|approximately\s+)?\d+(?:[.,]\d+)?(?:\s?(?:M|K|млн|тис\.|s|с|%))?|\b\d+\+|near zero|з нуля|two engineers|двох інженерів)/gi;

function highlightAchievement(text: string) {
  const segments = [];
  let lastIndex = 0;

  for (const match of text.matchAll(achievementHighlightPattern)) {
    const index = match.index ?? lastIndex;
    if (index > lastIndex) segments.push(text.slice(lastIndex, index));
    segments.push(<strong key={index}>{match[0]}</strong>);
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) segments.push(text.slice(lastIndex));
  return segments;
}

function useCardTilt() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 22, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 22, mass: 0.45 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const reducedMotion = useReducedMotion();

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return {
    reducedMotion,
    handlePointerMove,
    resetPointer,
    tiltStyle: {
      rotateX: reducedMotion ? 0 : rotateX,
      rotateY: reducedMotion ? 0 : rotateY,
      transformPerspective: 1100,
    },
  };
}

export default function PortfolioPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = content[language];
  const reducedMotion = useReducedMotion();
  const { handlePointerMove, resetPointer, tiltStyle } = useCardTilt();

  const reveal = reducedMotion
    ? {
        initial: false as const,
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
      }
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.12 },
      };

  return (
    <div className={styles.portfolioRoot} data-portfolio-root lang={language}>
      <div className={styles.pageGrain} aria-hidden="true" />
      <header className={styles.header}>
        <a className={styles.wordmark} href="#top" aria-label="Dmytro Rudniev — home">
          <span className={styles.mark}>
            dr<span>.</span>
          </span>
          <span className={styles.wordmarkText}>Dmytro Rudniev</span>
        </a>
        <nav className={styles.navigation} aria-label="Main navigation">
          <a href="#about">{copy.nav.about}</a>
          <a href="#experience">{copy.nav.experience}</a>
          <a href="#stack">{copy.nav.stack}</a>
          <a href="#contact">{copy.nav.contact}</a>
        </nav>
        <div className={styles.headerActions}>
          <div className={styles.languageSwitch} aria-label="Choose language">
            {(["en", "uk"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={language === option}
                onClick={() => setLanguage(option)}
              >
                {option === "uk" ? "UA" : "EN"}
              </button>
            ))}
          </div>
          <a className={styles.headerContact} href="mailto:dr.dima28@gmail.com">
            <span className={styles.statusDot} />
            {copy.nav.contact}
            <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-title">
          <motion.div
            className={styles.heroCopy}
            {...reveal}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className={styles.eyebrow}>
              <span />
              {copy.eyebrow}
            </p>
            <h1 id="hero-title">
              <span>{copy.headline[0]}</span>
              <span>
                {copy.headline[1]}
                <i>.</i>
              </span>
            </h1>
            <p className={styles.heroRole}>{copy.role}</p>
            <p className={styles.heroIntro}>{copy.intro}</p>
            <div className={styles.heroButtons}>
              <a className={styles.primaryButton} href="#contact">
                {copy.primaryCta}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                className={styles.secondaryButton}
                href="/downloads/Dmytro_Rudniev_Engineer.pdf"
                download
              >
                {copy.resumeCta}
                <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <div className={styles.locationLine}>
              <span>
                <MapPin size={14} aria-hidden="true" />
                {copy.location}
              </span>
              <span className={styles.locationDivider} aria-hidden="true" />
              <span>{copy.relocation}</span>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroVisual}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: "easeOut" }}
          >
            <div className={styles.visualHalo} aria-hidden="true" />
            <motion.div className={styles.scaleCard} style={tiltStyle}>
              <div className={styles.scaleCardTop}>
                <span className={styles.cardOverline}>
                  <span />
                  {copy.visualLabel}
                </span>
                <span className={styles.cardIndex}>01 / 04</span>
              </div>
              <div className={styles.scaleNumber}>
                ~100<span>M</span>
              </div>
              <p className={styles.scaleUnit}>{copy.requests}</p>
              <div className={styles.signalGraph} aria-hidden="true">
                <div className={styles.graphGrid} />
                <svg viewBox="0 0 520 112" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="signalFade" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#c9ff72" stopOpacity=".32" />
                      <stop offset="100%" stopColor="#c9ff72" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    className={styles.signalArea}
                    d="M0 83 C26 82 28 59 51 66 S80 83 104 64 S136 31 159 48 S189 77 217 57 S246 47 270 57 S294 69 319 39 S349 38 370 47 S398 62 419 34 S449 57 470 28 S499 30 520 10 V112 H0 Z"
                  />
                  <path
                    className={styles.signalLine}
                    d="M0 83 C26 82 28 59 51 66 S80 83 104 64 S136 31 159 48 S189 77 217 57 S246 47 270 57 S294 69 319 39 S349 38 370 47 S398 62 419 34 S449 57 470 28 S499 30 520 10"
                  />
                  <circle cx="519" cy="10" r="4" fill="#c9ff72" />
                </svg>
                <div className={styles.graphAxis}>
                  <span>LOAD</span>
                  <span>STEADY</span>
                  <span>SCALE</span>
                </div>
              </div>
              <p className={styles.scaleNote}>{copy.visualNote}</p>
              <div
                className={styles.techOrbit}
                aria-label="Technologies: Vue.js, TypeScript, GraphQL, design systems"
              >
                {copy.cardLabels.map((label, index) => (
                  <span className={`${styles.techPill} ${styles[`pill${index + 1}`]}`} key={label}>
                    {label}
                  </span>
                ))}
                <div className={styles.orbitCore} aria-hidden="true">
                  <span>DR</span>
                </div>
                <div className={styles.orbitRing} aria-hidden="true" />
              </div>
              <div className={styles.cardBottom}>
                <span>
                  <Check size={13} aria-hidden="true" />
                  {copy.signal}
                </span>
                <span>2019 — {copy.present}</span>
              </div>
            </motion.div>
            <div className={styles.floatingNote} aria-hidden="true">
              <span className={styles.floatingNoteIcon}>
                <Globe2 size={15} />
              </span>
              <span>
                <strong>{copy.experienceYears}</strong>
                <small>building for the web</small>
              </span>
            </div>
          </motion.div>
          <a className={styles.scrollCue} href="#about" aria-label="Scroll to about section">
            <span />
            SCROLL TO EXPLORE
          </a>
        </section>

        <motion.section
          id="about"
          className={styles.aboutSection}
          aria-labelledby="about-title"
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>
              <span>01</span>
              {copy.aboutLabel}
            </p>
            <div className={styles.aboutCopy}>
              <h2 id="about-title">{copy.aboutTitle}</h2>
              <p>{copy.aboutText}</p>
            </div>
          </div>
          <div className={styles.strengthGrid}>
            {copy.strengths.map((item) => (
              <article className={styles.strengthCard} key={item.number}>
                <span className={styles.strengthNumber}>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className={styles.cardArrow} aria-hidden="true">
                  <ArrowUpRight size={17} />
                </span>
              </article>
            ))}
          </div>
          <div className={styles.metricsBlock}>
            <p className={styles.sectionLabel}>
              <span>02</span>
              {copy.metricsLabel}
            </p>
            <div className={styles.metricsGrid}>
              {copy.metrics.map((metric) => (
                <div className={styles.metric} key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.performanceBlock}>
            <div className={styles.performanceHeading}>
              <p>{copy.performanceLabel}</p>
              <span>MEASURE · IMPROVE · REPEAT</span>
            </div>
            <div className={styles.performanceGrid}>
              {copy.performance.map((metric) => (
                <div className={styles.performanceMetric} key={metric.label}>
                  <span className={styles.performanceValues}>
                    {metric.from}
                    <ArrowRight size={16} aria-hidden="true" />
                    <strong>{metric.to}</strong>
                  </span>
                  <span className={styles.performanceLabel}>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.performanceVitals}>
              {copy.performanceVitals.map((metric) => (
                <div className={styles.performanceMetric} key={metric.label}>
                  <span className={styles.performanceValues}>
                    <strong>{metric.value}</strong>
                  </span>
                  <span className={styles.performanceLabel}>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className={styles.experienceSection}
          aria-labelledby="experience-title"
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>
              <span>03</span>
              {copy.experienceLabel}
            </p>
            <div className={styles.aboutCopy}>
              <h2 id="experience-title">
                {copy.experienceTitle}
                <i>.</i>
              </h2>
            </div>
          </div>
          <div className={styles.timeline}>
            <article className={styles.timelineItem}>
              <div className={styles.timelineMeta}>
                <span className={styles.timelineMarker} />
                <span className={styles.timelineDates}>
                  FEB 2021 — {copy.present.toUpperCase()}
                </span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.employerHeading}>
                  <div>
                    <h3>EVOPLAY</h3>
                    <p>{copy.currentRole}</p>
                  </div>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>
                <ul className={styles.achievementList}>
                  {copy.evoBullets.map((item) => (
                    <li key={item}>{highlightAchievement(item)}</li>
                  ))}
                </ul>
                <div className={styles.tagList}>
                  {skillKeys.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </article>
            <article className={styles.timelineItem}>
              <div className={styles.timelineMeta}>
                <span className={styles.timelineMarker} />
                <span className={styles.timelineDates}>MAY 2019 — FEB 2021</span>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.employerHeading}>
                  <div>
                    <h3>LIGA:ZAKON</h3>
                    <p>{copy.leagueRole}</p>
                  </div>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>
                <ul className={styles.achievementList}>
                  {copy.leagueBullets.map((item) => (
                    <li key={item}>{highlightAchievement(item)}</li>
                  ))}
                </ul>
                <div className={styles.tagList}>
                  <span>WordPress</span>
                  <span>PHP</span>
                  <span>SEO</span>
                  <span>Responsive UI</span>
                </div>
              </div>
            </article>
          </div>
        </motion.section>

        <motion.section
          id="stack"
          className={styles.stackSection}
          aria-labelledby="stack-title"
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>
              <span>04</span>
              {copy.stackLabel}
            </p>
            <div className={styles.aboutCopy}>
              <h2 id="stack-title">{copy.stackTitle}</h2>
            </div>
          </div>
          <div className={styles.stackGrid}>
            {copy.stackGroups.map((group, index) => (
              <article className={styles.stackGroup} key={group.title}>
                <span className={styles.stackIndex}>0{index + 1}</span>
                <h3>{group.title}</h3>
                <div className={styles.stackTags}>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className={styles.teamSection}
          aria-labelledby="team-title"
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.teamCopy}>
            <p className={styles.sectionLabel}>
              <span>05</span>
              {copy.workStyleLabel}
            </p>
            <h2 id="team-title">{copy.workStyleTitle}</h2>
            <p>{copy.workStyleText}</p>
          </div>
          <ul className={styles.teamFacts}>
            {copy.workStyleFacts.map((fact) => (
              <li key={fact}>
                <Check size={16} aria-hidden="true" />
                {fact}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          className={styles.educationSection}
          aria-labelledby="education-title"
          {...reveal}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.educationHeading}>
            <p className={styles.sectionLabel}>
              <span>06</span>
              {copy.educationLabel}
            </p>
            <h2 id="education-title">{copy.educationTitle}</h2>
          </div>
          <div className={styles.educationDetails}>
            <div>
              <span>2015 — 2020</span>
              <h3>{copy.degree}</h3>
              <p>{copy.university}</p>
            </div>
            <div>
              <span>{copy.languagesLabel}</span>
              <p className={styles.languageNames}>{copy.languages}</p>
            </div>
          </div>
        </motion.section>

        <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
          <div className={styles.contactOrb} aria-hidden="true" />
          <div className={styles.contactContent}>
            <p className={styles.contactEyebrow}>
              <span />
              {copy.contactLabel}
            </p>
            <h2 id="contact-title">{copy.contactTitle}</h2>
            <p className={styles.contactText}>{copy.contactText}</p>
            <a className={styles.contactButton} href="mailto:dr.dima28@gmail.com">
              <Mail size={17} aria-hidden="true" />
              {copy.emailCta}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/in/yo0oung" target="_blank" rel="noreferrer">
                {copy.linkedin}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
              <a href="https://github.com/Yo0ounG" target="_blank" rel="noreferrer">
                {copy.github}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </div>
          </div>
          <span className={styles.contactIndex} aria-hidden="true">
            DR / 2026
          </span>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.wordmark} href="#top" aria-label={copy.backTop}>
          <span className={styles.mark}>
            dr<span>.</span>
          </span>
          <span className={styles.wordmarkText}>{copy.footerNote}</span>
        </a>
        <span>© {new Date().getFullYear()} Dmytro Rudniev</span>
        <a href="#top">
          {copy.backTop}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
