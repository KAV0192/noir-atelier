import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Menu,
  Phone,
  Scissors,
  Sparkles,
  Star,
  X,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const navItems = [
  ["Услуги", "#services"],
  ["Цены", "#prices"],
  ["Мастера", "#masters"],
  ["Галерея", "#gallery"],
  ["Отзывы", "#reviews"],
  ["Запись", "#booking"],
  ["Контакты", "#contacts"],
];

const services = [
  {
    title: "Авторская стрижка",
    text: "Архитектурная стрижка с консультацией, мытьём, стайлингом и персональной рекомендацией по уходу.",
    image:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Королевское бритьё",
    text: "Классическое бритьё опасной бритвой, горячее полотенце, уход за кожей и ароматный финиш.",
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=90",
  },
  {
    title: "Ногтевой сервис",
    text: "Премиальное окрашивание, тонирование и сияющий уход для глубины цвета и дорогого блеска.",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=90",
  },
];

const prices = [
  ["Мужская стрижка", "60 мин", "3 500 ₽"],
  ["Женская стрижка", "75 мин", "4 800 ₽"],
  ["Стрижка + борода", "90 мин", "5 200 ₽"],
  ["Королевское бритьё", "45 мин", "3 200 ₽"],
  ["Окрашивание", "120 мин", "от 8 900 ₽"],
  ["Уход и восстановление", "50 мин", "4 500 ₽"],
];

const masters = [
  {
    name: "Александр Волков",
    role: "Арт-директор / Барбер",
    image:
      "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Мария Орлова",
    role: "Колорист / Стилист",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=90",
  },
  {
    name: "Дмитрий Соколов",
    role: "Мастер по стрижкам и текстуре",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=900&q=90",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1580618864180-f6d7d39b8ff6?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=900&q=90",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=90",
];

const reviews = [
  {
    name: "Анна Кузнецова",
    text: "Очень камерное и дорогое по ощущению место. Мастер внимательно разобрал форму, подобрал уход и сделал укладку, которая держалась весь день.",
  },
  {
    name: "Илья Морозов",
    text: "Лучший барбершоп, где я был в Москве. Стрижка, борода, сервис, музыка, кофе — всё выглядит и ощущается как premium-клуб.",
  },
  {
    name: "Екатерина Смирнова",
    text: "Окрашивание получилось именно таким, как я хотела: натурально, дорого и без перегруза. Волосы после ухода стали заметно мягче.",
  },
];

function useLenis() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}

function useGsapMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const parallaxItems = gsap.utils.toArray("[data-parallax]");
    parallaxItems.forEach((item) => {
      gsap.to(item, {
        yPercent: Number(item.dataset.parallax) || -12,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    const revealItems = gsap.utils.toArray("[data-reveal]");
    revealItems.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 42, filter: "blur(14px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
          },
        }
      );
    });

    const splitItems = gsap.utils.toArray("[data-split]");
    splitItems.forEach((item) => {
      const text = item.textContent;
      item.innerHTML = text
        .split(" ")
        .map((word) => `<span class="split-word"><span>${word}</span></span>`)
        .join(" ");

      gsap.fromTo(
        item.querySelectorAll(".split-word span"),
        { yPercent: 120, rotate: 2 },
        {
          yPercent: 0,
          rotate: 0,
          duration: 1.15,
          stagger: 0.035,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 82%",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

function AnimatedCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;

    const move = (event) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.55,
        ease: "power3.out",
      });
      gsap.to(dot, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.08,
      });
    };

    const enter = () => gsap.to(cursor, { scale: 1.9, duration: 0.25 });
    const leave = () => gsap.to(cursor, { scale: 1, duration: 0.25 });

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, input, textarea, select").forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-100/40 mix-blend-difference lg:block" />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100 lg:block" />
    </>
  );
}

function MagneticButton({ children, className = "", href = "#booking" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop) return;

    const move = (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.22, y: y * 0.28, duration: 0.35, ease: "power3.out" });
    };

    const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.35)" });

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <a ref={ref} href={href} className={className}>
      {children}
    </a>
  );
}

function LoadingScreen() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ delay: 1.15, duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[9998] grid place-items-center bg-[#080706] text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-amber-100/30 bg-amber-100/10">
          <Scissors className="h-7 w-7 text-amber-100" />
        </div>
        <p className="font-serif text-4xl tracking-[-0.04em]">NOIR ATELIER</p>
        <div className="mt-6 h-px w-64 overflow-hidden bg-white/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="h-full w-full bg-amber-100"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.28em] text-amber-200/80 backdrop-blur-xl">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080706]/65 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-amber-200/30 bg-amber-200/10 shadow-[0_0_50px_rgba(251,191,36,.18)] transition group-hover:scale-105">
            <Scissors className="h-5 w-5 text-amber-100" />
          </span>
          <span>
            <span className="block font-serif text-lg tracking-wide text-white">NOIR ATELIER</span>
            <span className="block text-[10px] uppercase tracking-[0.32em] text-white/45">Beauty & Barber</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map(([label, href]) => (
            <a key={label} href={href} className="text-sm text-white/62 transition hover:text-amber-100">
              {label}
            </a>
          ))}
        </nav>

        <MagneticButton href="#booking" className="hidden rounded-full bg-amber-100 px-5 py-3 text-sm font-medium text-black transition hover:bg-white hover:shadow-[0_16px_50px_rgba(251,191,36,.2)] lg:inline-flex">
          Онлайн-запись
        </MagneticButton>

        <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden" aria-label="Открыть меню">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/10 bg-[#080706]/95 px-5 py-5 lg:hidden">
            <div className="grid gap-4">
              {navItems.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/80">
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-20 text-white sm:pt-24">
      <div className="absolute inset-0">
        <video className="h-full w-full object-cover opacity-45" autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=2200&q=90">
          <source src="https://cdn.coverr.co/videos/coverr-barber-shaving-a-man-1568/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,.18),transparent_28%),linear-gradient(90deg,rgba(8,7,6,.96),rgba(8,7,6,.72),rgba(8,7,6,.2)),linear-gradient(0deg,rgba(8,7,6,1),transparent_45%)]" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-300/20 blur-[120px] floating-gradient" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-stone-500/20 blur-[130px] floating-gradient-delayed" />

      <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center px-4 py-12 sm:px-5 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
          <motion.div variants={fadeUp}>
            <SectionLabel>Premium grooming house</SectionLabel>
          </motion.div>
          <motion.h1 variants={fadeUp} data-split className="font-serif text-[3.25rem] leading-[0.9] tracking-[-0.06em] text-white min-[390px]:text-6xl sm:text-7xl lg:text-8xl">
            Тёмная роскошь. Точная форма. Твой новый образ.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-xl text-base leading-8 text-white/66 sm:text-lg">
            Салон красоты и барбершоп с камерной атмосферой, экспертными мастерами и сервисом, который ощущается как private club.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="#booking" className="group inline-flex items-center justify-center gap-3 rounded-full bg-amber-100 px-7 py-4 text-sm font-semibold text-black transition hover:bg-white hover:shadow-[0_24px_70px_rgba(251,191,36,.28)]">
              Забронировать визит
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton href="#services" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-medium text-white backdrop-blur-xl transition hover:border-amber-100/40 hover:bg-white/[0.08]">
              Смотреть услуги
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }} className="mt-14 lg:mt-0" data-parallax="-10">
          <div className="relative ml-auto max-w-md rounded-[2rem] border border-white/12 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-2xl">
            <img src="https://images.unsplash.com/photo-1599351431613-18ef1fdd27e1?auto=format&fit=crop&w=1100&q=90" alt="Barber service" className="aspect-[4/5] rounded-[1.55rem] object-cover" />
            <div className="absolute -bottom-7 left-6 right-6 rounded-3xl border border-white/12 bg-black/45 p-5 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-amber-100/70">Today</p>
                  <p className="mt-1 font-serif text-2xl">12 свободных слотов</p>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-black">
                  <CalendarDays className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#080706] px-4 py-16 sm:px-5 sm:py-24 text-white lg:px-8">
      <div className="absolute left-0 top-1/4 h-72 w-72 rounded-full bg-amber-300/10 blur-[110px] floating-gradient" />
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl" data-reveal>
          <SectionLabel>Услуги</SectionLabel>
          <h2 data-split className="font-serif text-4xl tracking-[-0.04em] sm:text-6xl">Ритуалы красоты вместо обычного визита.</h2>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((item, index) => (
            <motion.article key={item.title} variants={fadeUp} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-amber-100/30 hover:bg-white/[0.06]">
              <div className="overflow-hidden rounded-[1.45rem]">
                <img src={item.image} alt={item.title} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <span className="text-xs text-amber-100/60">0{index + 1}</span>
                <h3 className="mt-3 font-serif text-3xl">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/58">{item.text}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Prices() {
  return (
    <section id="prices" className="bg-[#0d0b09] px-4 py-16 sm:px-5 sm:py-24 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28" data-reveal>
          <SectionLabel>Прайс</SectionLabel>
          <h2 data-split className="font-serif text-4xl tracking-[-0.04em] sm:text-6xl">Прозрачные цены. Без случайных деталей.</h2>
          <p className="mt-6 leading-8 text-white/58">Каждая услуга включает консультацию, подбор формы и финишный стайлинг.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl" data-reveal>
          {prices.map(([name, time, price]) => (
            <div key={name} className="group grid grid-cols-[1fr_auto] gap-5 rounded-[1.45rem] border border-transparent px-5 py-5 transition hover:border-amber-100/20 hover:bg-white/[0.04] sm:grid-cols-[1fr_auto_auto]">
              <div>
                <h3 className="font-serif text-2xl">{name}</h3>
                <p className="mt-1 text-sm text-white/45">Premium service</p>
              </div>
              <div className="hidden items-center gap-2 text-sm text-white/50 sm:flex">
                <Clock className="h-4 w-4" />
                {time}
              </div>
              <div className="font-serif text-2xl text-amber-100">{price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Masters() {
  return (
    <section id="masters" className="relative overflow-hidden bg-[#080706] px-4 py-16 sm:px-5 sm:py-24 text-white lg:px-8">
      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-white/5 blur-[120px] floating-gradient-delayed" />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div className="max-w-2xl">
            <SectionLabel>Мастера</SectionLabel>
            <h2 data-split className="font-serif text-4xl tracking-[-0.04em] sm:text-6xl">Команда, которая создаёт статусный образ.</h2>
          </div>
          <p className="max-w-sm leading-8 text-white/58">Каждый мастер работает с формой, текстурой и персональным стилем клиента.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {masters.map((master) => (
            <article key={master.name} data-parallax="-8" className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]">
              <img src={master.image} alt={master.name} className="aspect-[3/4] w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-3xl">{master.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-amber-100/65">{master.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-[#0d0b09] px-4 py-16 sm:px-5 sm:py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl" data-reveal>
          <SectionLabel>Галерея</SectionLabel>
          <h2 data-split className="font-serif text-4xl tracking-[-0.04em] sm:text-6xl">Работы, которые выглядят дорого вживую и в кадре.</h2>
        </div>
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {gallery.map((src, index) => (
            <div key={src} className="group mb-5 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-2" data-reveal>
              <img src={src} alt={`Gallery ${index + 1}`} className={`w-full rounded-[1.5rem] object-cover transition duration-700 group-hover:scale-[1.04] ${index % 2 ? "aspect-[4/5]" : "aspect-[5/4]"}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-[#080706] px-4 py-16 sm:px-5 sm:py-24 text-white lg:px-8">
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-200/10 blur-[140px] floating-gradient" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-2xl" data-reveal>
          <SectionLabel>Отзывы</SectionLabel>
          <h2 data-split className="font-serif text-4xl tracking-[-0.04em] sm:text-6xl">Клиенты возвращаются за ощущением себя.</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} data-reveal className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl transition hover:-translate-y-2 hover:border-amber-100/25">
              <div className="flex gap-1 text-amber-100">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 leading-8 text-white/68">“{review.text}”</p>
              <p className="mt-6 font-serif text-2xl">{review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const timeSlots = useMemo(() => ["10:00", "12:30", "15:00", "17:30", "19:00"], []);

  return (
    <section id="booking" className="bg-[#0d0b09] px-4 py-16 sm:px-5 sm:py-24 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
        <div data-reveal className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-10">
          <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber-200/15 blur-[80px] floating-gradient" />
          <div className="relative">
            <SectionLabel>Онлайн-запись</SectionLabel>
            <h2 data-split className="font-serif text-4xl tracking-[-0.04em] sm:text-6xl">Выберите время для своего нового образа.</h2>
            <p className="mt-6 leading-8 text-white/58">Оставьте заявку — администратор подтвердит визит и поможет выбрать мастера.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {timeSlots.map((slot) => (
                <button key={slot} className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white/75 transition hover:-translate-y-1 hover:border-amber-100/35 hover:bg-amber-100 hover:text-black">
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        <form data-reveal className="rounded-[2rem] border border-white/10 bg-black/30 p-4 backdrop-blur-2xl sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-amber-100/40" placeholder="Ваше имя" />
            <input className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-amber-100/40" placeholder="Телефон" />
            <select className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition focus:border-amber-100/40 sm:col-span-2">
              <option>Выберите услугу</option>
              <option>Signature Haircut</option>
              <option>Royal Shave</option>
              <option>Color & Gloss</option>
              <option>Уход и восстановление</option>
            </select>
            <textarea className="min-h-36 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-white/35 focus:border-amber-100/40 sm:col-span-2" placeholder="Комментарий или пожелание" />
          </div>
          <button className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-amber-100 px-7 py-4 font-semibold text-black transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_70px_rgba(251,191,36,.22)]">
            Отправить заявку
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="contacts" className="bg-[#080706] px-4 py-16 sm:px-5 sm:py-24 text-white lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div data-reveal>
          <SectionLabel>Контакты</SectionLabel>
          <h2 data-split className="font-serif text-4xl tracking-[-0.04em] sm:text-6xl">Наша студия в центре города.</h2>
          <div className="mt-8 grid gap-4">
            <a href="tel:+7(123)123-45-67" className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-amber-100/25 hover:bg-white/[0.07]">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-amber-100 text-black"><Phone className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm text-white/45">Телефон</span>
                <span className="font-serif text-2xl">+7(123)123-45-67</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-amber-100 text-black"><MapPin className="h-5 w-5" /></span>
              <span>
                <span className="block text-sm text-white/45">Адрес</span>
                <span className="font-serif text-2xl">Москва, Малая Сухаревская площадь, 5</span>
              </span>
            </div>
          </div>
        </div>
        <div data-reveal className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3">
          <iframe title="Map" src="https://www.google.com/maps?q=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%9C%D0%B0%D0%BB%D0%B0%D1%8F%20%D0%A1%D1%83%D1%85%D0%B0%D1%80%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D1%8C%2C%205&output=embed" className="h-[320px] w-full rounded-[1.25rem] grayscale invert sm:h-[420px] sm:rounded-[1.5rem]" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080706] px-5 py-10 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-serif text-2xl">NOIR ATELIER</p>
          <p className="mt-2 text-sm text-white/42">Beauty salon & barbershop. Premium grooming experience.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="#top" className="rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white/70 transition hover:border-amber-100/30 hover:text-white">Наверх</a>
          <a href="https://instagram.com" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-amber-100/30 hover:text-white" aria-label="Instagram">
            <span className="text-sm font-semibold">IG</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function LuxuryBarbershopLanding() {
  useLenis();
  useGsapMotion();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080706] font-sans text-white selection:bg-amber-100 selection:text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        html { scroll-behavior: auto; }
        body { 
          margin: 0; 
          background: #080706; 
          cursor: auto; 
        }

        @media (min-width: 1024px) {
          body {
            cursor: none;
          }
        }
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }

        .noise::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9997;
          opacity: .08;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .split-word {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
          margin-right: .16em;
        }

        .split-word span {
          display: inline-block;
        }

        .floating-gradient {
          animation: floatSoft 8s ease-in-out infinite alternate;
        }

        .floating-gradient-delayed {
          animation: floatSoft 10s ease-in-out infinite alternate-reverse;
        }

        @keyframes floatSoft {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to { transform: translate3d(28px, -34px, 0) scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
      <div className="noise" />
      <AnimatedCursor />
      <LoadingScreen />
      <Header />
      <Hero />
      <Services />
      <Prices />
      <Masters />
      <Gallery />
      <Reviews />
      <Booking />
      <Contacts />
      <Footer />
    </main>
  );
}
