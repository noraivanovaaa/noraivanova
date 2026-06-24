// Нора Иванова — landing page
const { useEffect, useRef, useState } = React;

const INSTAGRAM_URL = "https://instagram.com/nora.ivanova";

// ---------- Reveal on scroll ----------
function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}

// ---------- Tiny line icons (1.25 stroke) ----------
const stroke = { stroke: "currentColor", strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
const Icon = {
  Moon: (p) => <svg viewBox="0 0 32 32" {...p}><path d="M22.5 19.5A8.5 8.5 0 0 1 12.5 9.5a7.5 7.5 0 1 0 10 10Z" {...stroke} /></svg>,
  Spark: (p) => <svg viewBox="0 0 32 32" {...p}><path d="M16 5v22M5 16h22M9 9l14 14M23 9 9 23" {...stroke} /></svg>,
  Heart: (p) => <svg viewBox="0 0 32 32" {...p}><path d="M16 25s-9-5.4-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.6-9 12-9 12Z" {...stroke} /></svg>,
  Leaf: (p) => <svg viewBox="0 0 32 32" {...p}><path d="M7 25c0-9 7-16 18-16-1 11-7 18-18 18Zm0 0L20 12" {...stroke} /></svg>,
  Circle: (p) => <svg viewBox="0 0 32 32" {...p}><circle cx="16" cy="16" r="10" {...stroke} /><circle cx="16" cy="16" r="3" {...stroke} /></svg>,
  Flame: (p) => <svg viewBox="0 0 32 32" {...p}><path d="M16 4c2 5 7 7 7 13a7 7 0 1 1-14 0c0-3 2-5 3-7 1 2 2 3 4 3 0-3-1-6 0-9Z" {...stroke} /></svg>,
  Compass: (p) => <svg viewBox="0 0 32 32" {...p}><circle cx="16" cy="16" r="11" {...stroke} /><path d="m20 12-6 2-2 6 6-2 2-6Z" {...stroke} /></svg>,
  Wave: (p) => <svg viewBox="0 0 32 32" {...p}><path d="M4 14c3-3 6-3 9 0s6 3 9 0 4-3 6-1M4 22c3-3 6-3 9 0s6 3 9 0 4-3 6-1" {...stroke} /></svg>,
  Sun: (p) => <svg viewBox="0 0 32 32" {...p}><circle cx="16" cy="16" r="5" {...stroke} /><path d="M16 3v3M16 26v3M3 16h3M26 16h3M7 7l2 2M23 23l2 2M7 25l2-2M23 9l2-2" {...stroke} /></svg>,
  Plus: (p) => <svg viewBox="0 0 32 32" {...p}><path d="M16 8v16M8 16h16" {...stroke} /></svg>,
  Instagram: (p) =>
  <svg viewBox="0 0 24 24" {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} />
      <circle cx="12" cy="12" r="4" {...stroke} />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>,

  Arrow: (p) => <svg viewBox="0 0 24 24" {...p}><path d="M5 12h14M13 6l6 6-6 6" {...stroke} /></svg>
};

// ---------- Reusable bits ----------
function Eyebrow({ children, className = "" }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-ink-soft ${className}`}>
      <span className="block h-px w-8 bg-sand"></span>
      <span>{children}</span>
    </div>);

}

function CTA({ children, variant = "primary", small = false, className = "" }) {
  const base = "inline-flex items-center gap-3 rounded-full transition-all duration-500";
  const sz = small ? "px-6 py-2.5 text-[13px]" : "px-8 py-4 text-[14px]";
  const styles = variant === "primary" ?
  "bg-ink text-cream hover:bg-[#3a3633]" :
  variant === "lavender" ?
  "bg-lavender text-ink hover:bg-[#bba9cd]" :
  "border border-ink/40 text-ink hover:border-ink hover:bg-ink hover:text-cream";
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${sz} ${styles} ${className} group`}>
      
      <Icon.Instagram className="h-4 w-4 opacity-90" />
      <span className="font-medium tracking-wide">{children}</span>
      <Icon.Arrow className="h-4 w-4 -ml-1 transition-transform duration-500 group-hover:translate-x-1" />
    </a>);

}

function Divider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="block h-px w-16 bg-sand"></span>
      <span className="block h-1.5 w-1.5 rounded-full bg-lavender"></span>
      <span className="block h-px w-16 bg-sand"></span>
    </div>);

}

// ---------- Nav ----------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
  ["Восък", "#wax"],
  ["За Нора", "#about"],
  ["Програма", "#program"],
  ["Консултации", "#consult"],
  ["Отзиви", "#testimonials"],
  ["Въпроси", "#faq"],

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "bg-cream/85 backdrop-blur-md border-b border-sand/60" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-display text-2xl">Нора Иванова</span>
        </a>
        <nav className="hidden lg:flex items-center gap-9 text-[13px] text-ink-soft">
          {links.map(([l, h]) =>
          <a key={h} href={h} className="hover:text-ink transition-colors">{l}</a>
          )}
        </nav>
        <div className="hidden lg:block">
          <CTA small variant="outline">Instagram</CTA>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-ink p-2" aria-label="Меню">
          <svg viewBox="0 0 24 24" className="h-5 w-5"><path d="M3 7h18M3 12h18M3 17h18" {...stroke} /></svg>
        </button>
      </div>
      {open &&
      <div className="lg:hidden border-t border-sand bg-cream">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map(([l, h]) =>
          <a key={h} href={h} onClick={() => setOpen(false)} className="text-[15px] text-ink-soft">{l}</a>
          )}
            <CTA small variant="primary" className="mt-2 w-fit">Пишете в Instagram</CTA>
          </div>
        </div>
      }
    </header>);

}

// ---------- Hero ----------
function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-16 md:pb-28 overflow-hidden">
      {/* decorative discs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-lavender/40 blur-3xl drift" aria-hidden></div>
      <div className="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-peach/40 blur-3xl drift2" aria-hidden></div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <Reveal>
            <Eyebrow>Духовно водачество · от 2018</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-display mt-6 text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.02] tracking-tight">
              Манифестирай<br />
              <span className="italic font-light">изобилието,</span><br />
              което вече е твое.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-xl text-[15px] md:text-base leading-relaxed text-ink-soft">
              Аз съм Нора — коуч и фасилитатор на духовни практики. Помагам на жени да отворят пространство за изобилие, спокойствие и яснота чрез внимание, ритуал и осъзнато действие.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <CTA variant="primary">Пишете ни в Instagram</CTA>
              <a href="#about" className="text-[13px] tracking-wide text-ink-soft hover:text-ink underline-offset-4 hover:underline">Разгледай програмата

              </a>
            </div>
          </Reveal>
          <Reveal delay={480}>
            <div className="mt-14 grid grid-cols-3 max-w-md gap-6 pt-8 border-t border-sand">
              {[
              ["7+", "години практика"],
              ["120+", "жени във водачество"],
              ["3", "групови потока годишно"]].
              map(([n, l]) =>
              <div key={l}>
                  <div className="font-display text-3xl">{n}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ink-soft">{l}</div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <Reveal delay={120}>
            <div className="relative">
              {/* soft frame */}
              <div className="absolute -inset-4 rounded-[2.5rem] bg-lavender-soft/60 blur-[2px]" aria-hidden></div>
              <div className="relative rounded-[2.25rem] overflow-hidden bg-cream-deep aspect-[4/5] shadow-[0_30px_60px_-30px_rgba(45,42,40,0.25)]">
                <img src="assets/nora-hero-v2.jpg" alt="Нора Иванова" className="w-full h-full object-cover portrait-mask" />
                {/* tiny tag */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-ink/80">
                  <span>Нора · София</span>
                  <span>'26</span>
                </div>
              </div>
              {/* floating chip */}
              <div className="hidden md:flex absolute -left-6 top-10 items-center gap-3 rounded-full bg-cream border border-sand px-4 py-2 shadow-[0_10px_24px_-12px_rgba(45,42,40,0.25)]">
                <span className="block h-2 w-2 rounded-full bg-lavender"></span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Нов поток · Май</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* marquee-ish credo */}
      <Reveal>
        <div className="relative mt-20 md:mt-28 mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-10 text-[12px] uppercase tracking-[0.28em] text-ink-soft border-t border-b border-sand py-6">
            <span className="flex items-center gap-3"><Icon.Moon className="h-4 w-4 text-lavender" /> Интуиция</span>
            <span className="flex items-center gap-3"><Icon.Spark className="h-4 w-4 text-lavender" /> Намерение</span>
            <span className="flex items-center gap-3"><Icon.Heart className="h-4 w-4 text-peach" /> Доверие</span>
            <span className="flex items-center gap-3"><Icon.Leaf className="h-4 w-4 text-lavender" /> Природа</span>
            <span className="flex items-center gap-3"><Icon.Circle className="h-4 w-4 text-peach" /> Цикъл</span>
            <span className="flex items-center gap-3"><Icon.Flame className="h-4 w-4 text-lavender" /> Действие</span>
          </div>
        </div>
      </Reveal>
    </section>);

}

// ---------- About ----------
function About() {
  const points = [
  { icon: <Icon.Moon className="h-6 w-6" />, t: "Меко водачество", d: "Без догма. Срещам те там, където си, с уважение към твоя ритъм и история." },
  { icon: <Icon.Compass className="h-6 w-6" />, t: "Практичен метод", d: "Работим с конкретни ритуали, дневници, дишане и осъзнато планиране — не само концепции." },
  { icon: <Icon.Heart className="h-6 w-6" />, t: "Жива общност", d: "Сестринско поле от жени, в което изобилието става нормална, споделена реалност." }];

  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="relative">
              <div className="aspect-[3/4] rounded-[2rem] overflow-hidden bg-cream-deep">
                <img src="assets/nora-portrait-v2.jpg" alt="Нора" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block">
                <div className="rounded-2xl bg-cream border border-sand px-5 py-4 shadow-[0_18px_36px_-18px_rgba(45,42,40,0.25)]">
                  <div className="font-display text-2xl leading-none">"</div>
                  <p className="mt-1 text-[13px] text-ink-soft max-w-[14rem] leading-snug">Изобилието не е цел. То е способ да живееш.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            <Eyebrow>За Нора</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display mt-6 text-4xl md:text-5xl leading-[1.05]">
              Жена, която вярва, че <span className="italic">изобилието</span> се култивира — бавно и с грижа.
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-soft max-w-2xl">
              <p>Преди десет години оставих корпоративна кариера, за да се вслушам в това, което винаги е било вътре в мен. Оттогава работя с жени, които искат повече смисъл, повече покой и повече истинско изобилие в живота си.</p>
              <p>Програмите ми съчетават древни духовни практики с модерни инструменти за коучинг. Меко, но без илюзии: тук правим работа.</p>
            </div>
          </Reveal>

          <div className="mt-14 grid sm:grid-cols-3 gap-4">
            {points.map((p, i) =>
            <Reveal key={p.t} delay={i * 120}>
                <div className="rounded-3xl border border-sand bg-cream p-6 h-full">
                  <div className="text-lavender">{p.icon}</div>
                  <h3 className="mt-5 font-display text-xl">{p.t}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{p.d}</p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>);

}

// ---------- Program (main focus) ----------
function Program() {
  const includes = [
  { icon: <Icon.Moon className="h-5 w-5" />, t: "8 седмични модула", d: "Структуриран път през осем теми за вътрешна и външна реалност." },
  { icon: <Icon.Spark className="h-5 w-5" />, t: "Живи групови сесии", d: "Двучасови онлайн срещи в кръг, всяка седмица." },
  { icon: <Icon.Leaf className="h-5 w-5" />, t: "Ритуали и медитации", d: "Записани практики за работа с цикъла, луната и намерението." },
  { icon: <Icon.Compass className="h-5 w-5" />, t: "Личен дневник", d: "Подсказки и упражнения за всяка седмица — на хартия и дигитално." },
  { icon: <Icon.Heart className="h-5 w-5" />, t: "Сестринско поле", d: "Затворена общност от участнички и алумни — отвъд програмата." },
  { icon: <Icon.Flame className="h-5 w-5" />, t: "1:1 разговор с Нора", d: "Една лична сесия за пренастройка по средата на пътя." }];

  return (
    <section id="program" className="relative py-24 md:py-36 bg-cream-deep/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>Главна програма</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="font-display mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.04]">
                Програма за манифестиране на <span className="italic">изобилие</span>
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-7 text-[15px] leading-relaxed text-ink-soft max-w-md">
                Осемседмично групово пътуване, в което учим да отваряме пространство — за пари, отношения, здраве и творчество — без да се изгаряме по пътя.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-10 rounded-3xl border border-sand bg-cream p-6 md:p-7">
                <div className="grid grid-cols-2 gap-y-5 gap-x-6">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Формат</div>
                    <div className="mt-2 font-display text-xl">Онлайн · групово</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Времетраене</div>
                    <div className="mt-2 font-display text-xl">8 седмици</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Език</div>
                    <div className="mt-2 font-display text-xl">Български</div>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">Следващ поток</div>
                    <div className="mt-2 font-display text-xl">Юни 2026</div>
                  </div>
                </div>
                <div className="mt-7 pt-5 border-t border-sand text-[13px] leading-relaxed text-ink-soft">
                  Цена и условия по запитване — пишете ни в Instagram DM за актуалните дати, бонуси и възможност за разсрочване.
                </div>
                <div className="mt-6">
                  <CTA variant="primary" small>Запитване в Instagram</CTA>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-[2rem] border border-sand bg-cream p-7 md:p-10">
                <div className="flex items-center justify-between">
                  <Eyebrow>Какво включва</Eyebrow>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">06 елемента</span>
                </div>
                <ul className="mt-8 divide-y divide-sand">
                  {includes.map((p, i) =>
                  <li key={p.t} className="grid grid-cols-[auto_1fr_auto] items-start gap-5 py-5">
                      <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-lavender-soft text-ink">{p.icon}</span>
                      <div>
                        <div className="font-display text-xl">{p.t}</div>
                        <div className="mt-1 text-[13px] leading-relaxed text-ink-soft max-w-xl">{p.d}</div>
                      </div>
                      <span className="hidden sm:block text-[11px] uppercase tracking-[0.22em] text-ink-soft mt-2">0{i + 1}</span>
                    </li>
                  )}
                </ul>
              </div>
            </Reveal>

            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              <Reveal>
                <div className="rounded-3xl bg-lavender-soft p-7 h-full">
                  <Eyebrow>За кого е</Eyebrow>
                  <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-ink">
                    <li className="flex gap-3"><Icon.Plus className="h-4 w-4 mt-1 shrink-0" /> Жени, готови за вътрешна работа</li>
                    <li className="flex gap-3"><Icon.Plus className="h-4 w-4 mt-1 shrink-0" /> Които искат повече смисъл, не повече "още"</li>
                    <li className="flex gap-3"><Icon.Plus className="h-4 w-4 mt-1 shrink-0" /> Отворени към ритуал и духовност</li>
                    <li className="flex gap-3"><Icon.Plus className="h-4 w-4 mt-1 shrink-0" /> Търсещи общност от единомислещи</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="rounded-3xl bg-peach-soft p-7 h-full">
                  <Eyebrow>Какъв е резултатът</Eyebrow>
                  <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-ink">
                    <li className="flex gap-3"><Icon.Plus className="h-4 w-4 mt-1 shrink-0" /> По-ясен вътрешен компас</li>
                    <li className="flex gap-3"><Icon.Plus className="h-4 w-4 mt-1 shrink-0" /> Лична практика, която остава с теб</li>
                    <li className="flex gap-3"><Icon.Plus className="h-4 w-4 mt-1 shrink-0" /> Конкретни стъпки в живота и работата</li>
                    <li className="flex gap-3"><Icon.Plus className="h-4 w-4 mt-1 shrink-0" /> Меко, устойчиво усещане за изобилие</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ---------- Consultations ----------
function Consultations() {
  const items = [
  {
    tag: "60 минути",
    t: "Енергийна пренастройка",
    d: "Дълбок разговор за това, което се движи в момента — с практики и насоки за следващите 30 дни."
  },
  {
    tag: "90 минути",
    t: "Манифест компас",
    d: "Сесия за яснота върху едно конкретно намерение — пари, връзка, проект или решение пред теб."
  },
  {
    tag: "Пакет от 4",
    t: "Лично водачество",
    d: "Месец придружаване в по-сериозен преход. Заедно изграждаме твоя ритъм и практика."
  }];

  return (
    <section id="consult" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Лични консултации</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="font-display mt-6 text-4xl md:text-5xl leading-[1.05] max-w-2xl">
                За когато искаш по-камерно — само ти и аз.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <p className="text-[15px] leading-relaxed text-ink-soft max-w-md">
                Срещи едно-към-едно, онлайн или на живо в София. Всяка сесия е поверителна и адаптирана към момента, в който се намираш.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((it, i) =>
          <Reveal key={it.t} delay={i * 120}>
              <article className="group h-full rounded-3xl border border-sand bg-cream p-7 flex flex-col transition-all duration-500 hover:border-ink/25 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-ink-soft">{it.tag}</span>
                  <span className="font-display text-xl text-ink-soft/60">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl leading-tight">{it.t}</h3>
                <p className="mt-4 text-[14px] leading-relaxed text-ink-soft flex-grow">{it.d}</p>
                <div className="mt-8 pt-5 border-t border-sand flex items-center justify-between">
                  <span className="text-[12px] uppercase tracking-[0.22em] text-ink">По запитване</span>
                  <Icon.Arrow className="h-4 w-4 text-ink transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </article>
            </Reveal>
          )}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex flex-col sm:flex-row items-center gap-6 justify-center">
            <p className="text-[14px] text-ink-soft text-center sm:text-left max-w-md">За да изберем заедно подходящия формат — пишете в Instagram, разкажете ми накратко за себе си.</p>
            <CTA variant="lavender">Пишете в Instagram за повече</CTA>
          </div>
        </Reveal>
      </div>
    </section>);

}

// ---------- Wax therapy ----------
function Wax() {
  return (
    <section id="wax" className="relative pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="relative rounded-[2rem] overflow-hidden border border-sand bg-gradient-to-br from-peach-soft via-cream to-lavender-soft">
            <div className="grid md:grid-cols-12 gap-0">
              <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto bg-cream-deep">
                {/* abstract candle/wax SVG placeholder */}
                <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="wax" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F0D4C8" />
                      <stop offset="100%" stopColor="#C9B8D9" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="500" fill="#F4EEE4" />
                  <ellipse cx="200" cy="380" rx="170" ry="14" fill="#E8DFD2" />
                  <path d="M120 380 Q120 220 200 180 Q280 220 280 380 Z" fill="url(#wax)" opacity="0.85" />
                  <path d="M200 180 Q200 140 200 120" stroke="#2D2A28" strokeWidth="1.5" fill="none" />
                  <path d="M200 120 Q193 105 200 90 Q207 105 200 120 Z" fill="#F0D4C8" />
                  <circle cx="200" cy="100" r="3" fill="#2D2A28" opacity="0.4" />
                  {/* drips */}
                  <path d="M150 320 Q150 360 145 380" stroke="#fff" strokeWidth="1" opacity="0.5" fill="none" />
                  <path d="M250 290 Q252 340 248 380" stroke="#fff" strokeWidth="1" opacity="0.5" fill="none" />
                </svg>
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-2 rounded-full bg-cream/90 backdrop-blur border border-sand px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-ink">
                    <span className="block h-1.5 w-1.5 rounded-full bg-peach"></span>
                    Събитие на живо
                  </span>
                </div>
              </div>
              <div className="md:col-span-7 p-8 md:p-14 flex flex-col justify-center">
                <Eyebrow>Восъкотерапия</Eyebrow>
                <h2 className="font-display mt-6 text-4xl md:text-5xl leading-[1.04]">
                  Древна практика за <span className="italic">прочистване</span> и обновление.
                </h2>
                <p className="mt-6 text-[15px] leading-relaxed text-ink-soft max-w-xl">
                  Топен пчелен восък като огледало за това, което сме готови да отпуснем. Провеждам восъкотерапия на живо като камерно групово събитие — няколко пъти в годината, в София.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
                  <CTA variant="outline" small>Разбери повече в Instagram</CTA>
                  <span className="text-[12px] uppercase tracking-[0.22em] text-ink-soft">Следваща дата · обявяваме скоро</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}

// ---------- Testimonials ----------
function Testimonials() {
  const items = [
  { q: "Нора държи едно толкова меко и същевременно ясно поле, че за първи път си позволих да искам повече, без вина.", n: "Мария Г.", c: "Алумна, поток '24" },
  { q: "След програмата спрях да гоня и започнах да привличам. Звучи клиширано — но точно това се случи в живота ми.", n: "Деси К.", c: "Алумна, поток '23" },
  { q: "Восъкотерапията беше едно от най-силните ритуални преживявания в живота ми. Заминах си друга жена.", n: "Елена П.", c: "Восъкотерапия" },
  { q: "Личните сесии с Нора са като лек разговор с приятелка, но винаги си тръгвам с нещо много конкретно за правене.", n: "Ива М.", c: "1:1 консултация" }];

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-cream-deep/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Думи от жени</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="font-display mt-6 text-4xl md:text-5xl leading-[1.05] max-w-2xl">
                Тихи свидетелства от жени, които вече вървят по своя път.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <Divider className="lg:justify-end" />
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8">
          {items.map((it, i) =>
          <Reveal key={it.n} delay={i % 2 * 120}>
              <figure className="rounded-3xl border border-sand bg-cream p-8 md:p-10 h-full flex flex-col">
                <div className="font-display text-5xl leading-none text-lavender">"</div>
                <blockquote className="mt-4 font-display text-2xl md:text-[1.7rem] leading-snug text-ink">
                  {it.q}
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-sand flex items-center justify-between text-[12px] uppercase tracking-[0.22em] text-ink-soft">
                  <span className="text-ink">{it.n}</span>
                  <span>{it.c}</span>
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

// ---------- FAQ ----------
function FAQ() {
  const items = [
  { q: "Трябва ли да имам предишен духовен опит?", a: "Не. Идваш такава, каквато си. Програмата е така структурирана, че да те посрещне както в самото начало на пътя, така и ако вече имаш практика." },
  { q: "Колко време отнема седмично?", a: "Средно 2 часа жива сесия в кръг и около 30–60 минути лична практика през седмицата. Всичко е записано и можеш да гледаш в твоето време." },
  { q: "Има ли възможност за разсрочване?", a: "Да. Имаме гъвкави условия за плащане. Конкретните опции споделям лично — пишете ми в Instagram DM." },
  { q: "Какво ако пропусна сесия?", a: "Всички живи срещи се записват и остават достъпни в платформата за минимум 6 месеца след края на потока." },
  { q: "Това религия ли е?", a: "Не. Работата ми не принадлежи към никоя религия. Тя комбинира женски духовни практики с инструменти от модерния коучинг — без догма." },
  { q: "Защо само Instagram?", a: "Защото общуването там е лично и спокойно. Така мога да отговоря на всеки въпрос внимателно, вместо да попадате във форма." }];

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal><Eyebrow>Често задавани въпроси</Eyebrow></Reveal>
        <Reveal delay={120}>
          <h2 className="font-display mt-6 text-4xl md:text-5xl leading-[1.05] max-w-3xl">
            Всичко, което искаш да попиташ — преди да попиташ.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-sand">
          {items.map((it, i) =>
          <Reveal key={it.q} delay={i * 60}>
              <details className="group border-b border-sand py-6 md:py-7">
                <summary className="flex items-start justify-between gap-8">
                  <span className="font-display text-xl md:text-2xl leading-snug text-ink pr-8">{it.q}</span>
                  <span className="mt-1 shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-sand text-ink">
                    <span className="faq-icon"><Icon.Plus className="h-4 w-4" /></span>
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-ink-soft">{it.a}</p>
              </details>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

// ---------- Contact / Footer ----------
function ContactFooter() {
  return (
    <section id="contact" className="relative pt-24 md:pt-32 pb-10 overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-lavender/30 blur-3xl drift" aria-hidden></div>

      <div className="relative mx-auto max-w-5xl px-6 md:px-10 text-center">
        <Reveal><Eyebrow className="justify-center">Свържи се</Eyebrow></Reveal>
        <Reveal delay={120}>
          <h2 className="font-display mt-8 text-4xl md:text-6xl lg:text-7xl leading-[1.04]">
            Имаш въпрос? <br className="hidden md:block" />
            <span className="italic">Пишете ни в Instagram DM.</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-8 text-[15px] text-ink-soft max-w-xl mx-auto">
            Без формуляри, без обаждания. Само спокоен разговор — отговарям лично, обикновено в рамките на 24 часа.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-12 inline-flex flex-col items-center gap-5">
            <CTA variant="primary">@nora.ivanova · Пишете в Instagram</CTA>
            <span className="text-[11px] uppercase tracking-[0.28em] text-ink-soft">Понеделник–петък · меко и без бързане</span>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <footer className="mt-28 border-t border-sand">
          <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-ink-soft">
            <div className="flex items-center gap-3">
              <span className="font-display text-lg text-ink">Нора Иванова</span>
              <span className="block h-1 w-1 rounded-full bg-sand"></span>
              <span>Манифестирай изобилието</span>
            </div>
            <div className="flex items-center gap-6">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink"><Icon.Instagram className="h-3.5 w-3.5" /> Instagram</a>
              <span>© 2026 · София, България</span>
            </div>
          </div>
        </footer>
      </Reveal>
    </section>);

}

// ---------- App ----------
function App() {
  return (
    <main className="relative">
      <Nav />
      <Wax />
      <Hero />
      <About />
      <Program />
      <Consultations />
      <Testimonials />
      <FAQ />
      <ContactFooter />
    </main>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);