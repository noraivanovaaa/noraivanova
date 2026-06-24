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
  ["Восъкотерапия", "#wax"],
  ["За Нора", "#about"],
  ["Програма", "#program"],
  ["Консултации", "#consult"],
  ["Отзиви", "#testimonials"],
  ["Въпроси", "#faq"]];

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
function About() {
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
                  <p className="mt-1 text-[13px] text-ink-soft max-w-[14rem] leading-snug">Всичко важно се случва в теб.</p>
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
              Психолог, хипнотерапевт<br /><span className="italic font-light">и търсеща душа.</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-soft max-w-2xl">
              <p>Цял живот се клатушкам между езотериката и психологията. Дълго не знаех как да ги събера.</p>
              <p>Детето ми се удари, уплаши се и започна да плаче всяка вечер. Отидох при жена, която му изля восък. И някак магически — спря да плаче. Нещо в мен се събуди. Поисках да се науча. И сякаш всичко се наредило точно така, че да мога — хората, срещите, знанието. Взех от древния тракийски ритуал това, което работи, добавих всичко, което знаех от психологията, и създадох нещо, което е мое. Метод, в който вярвам. Метод, с който мога да бъда максимално полезна.</p>
              <p>Восъкът запечатва негативната енергия и я изхвърля. Ти си тълкуваш образите — те се свързват с несъзнаваното. Осъзнаването остава. Аз само подпомагам процеса. Всичко важно се случва в теб.</p>
              <p>Не работя само с думи. Вярвам, че тялото, образите и сетивата знаят неща, до които умът стига бавно. Затова харесвам преживелищните терапии — тези, които стигат по-дълбоко от говоренето.</p>
              <p>Магистър съм по психология с психоаналитична насоченост. Работя 7 години. Имах корпоративна кариера — напуснах я, за да последвам себе си. От малка знаех, че ще помагам на хора. Не знаех само как.</p>
              <p className="font-medium text-ink">Сега знам.</p>
              <p>Приемам в кабинет във Велико Търново и онлайн. Събития с восъкотерапия провеждам и в други градове — следващите дати обявявам през септември.</p>
            </div>
          </Reveal>
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
// ---------- Consultations ----------
function Consultations() {
  const items = [
  {
    tag: "Групова практика · 90–120 минути",
    t: "Восъкотерапия група",
    d: "Групова сесия в различни градове. Всеки участник лее своя восък, работим с образа и го задълбочаваме чрез асоциативно писане — какво символизира, какво разкрива за теб в момента."
  },
  {
    tag: "Онлайн · 90–120 минути",
    t: "Восъкотерапия онлайн",
    d: "Индивидуална сесия, при която аз лея восъка и тълкуваме образа заедно в реално време. Работата включва и асоциативно писане — за да осъзнаеш вътрешните модели и конфликти зад решенията ти."
  },
  {
    tag: "Велико Търново · 90–120 минути",
    t: "Восъкотерапия в кабинет",
    d: "Присъствена сесия в Велико Търново. Ти леееш восъка, аз водя процеса — включва асоциативно писане и задълбочена работа с образа. Работата на живо дава пространство за по-цялостна среща със себе си."
  },
  {
    tag: "Дистанционно · Енергиен ритуал",
    t: "Восъколеене",
    d: "Аз лея восъка дистанционно. Не е терапия — това е символично пречистване и освобождаване. Работим с образа и посланието му за теб."
  },
  {
    tag: "60 минути",
    t: "Психологическа консултация",
    d: "Разговор едно-към-едно с мен като психолог. За ориентиране, яснота или конкретна тема — без восък, само разговор върху това, което те вълнува."
  }];

  return (
    <section id="consult" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Консултации</Eyebrow></Reveal>
            <Reveal delay={120}>
              <h2 className="font-display mt-6 text-4xl md:text-5xl leading-[1.05] max-w-2xl">
                Намери своя път към промяната.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <p className="text-[15px] leading-relaxed text-ink-soft max-w-md">
                Онлайн, на живо или дистанционно — избираш формата, който ти отговаря.
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

function Wax() {
  const forWhom = [
    "Сблъскваш се с повтарящи се ситуации в живота си",
    "Усещаш застой без ясна външна причина",
    "Вземаш решения, които изглеждат правилни, но не дават резултат",
    "Искаш да разбереш къде вътрешно се блокира процесът",
    "Готова си да се освободиш от нещо, което вече не ти трябва",
    "Носиш хроничен стрес или негативизъм, от който искаш да излезеш",
  ];
  const steps = [
    { icon: "🕯️", text: "Работа със символиката на восъка" },
    { icon: "🧠", text: "Активиране на несъзнаваното чрез образи и асоциации" },
    { icon: "🔍", text: "Осъзнаване на вътрешни конфликти и лични модели" },
  ];
  const effects = [
    "Осветляване на несъзнавани убеждения",
    "По-структурирано вземане на решения",
    "По-свободна себереализация",
  ];
  return (
    <section id="wax" className="relative py-24 md:py-32 bg-gradient-to-b from-cream to-peach-soft/30">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <Reveal>
          <Eyebrow className="justify-center">Авторски метод</Eyebrow>
          <h2 className="font-display mt-6 text-center text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.04]">
            Восъкотерапия —<br /><span className="italic font-light">древно знание, съвременен поглед</span>
          </h2>
          <p className="mt-8 mx-auto max-w-2xl text-center text-[15px] leading-relaxed text-ink-soft">
            Това не е ритуал — това е терапевтична практика, която съкращава пътя към осъзнаването на вътрешни конфликти, повтарящи се модели и автоматични избори, които влияят на решенията ти.
          </p>
          <p className="mt-4 mx-auto max-w-2xl text-center text-[15px] leading-relaxed text-ink-soft">
            Восъкотерапията съчетава древен тракийски ритуал с принципи на съвременната психология и психотерапия. Работи с образи и символи, които активират дълбоки вътрешни процеси и изваждат на повърхността скритите механизми зад поведението ни.
          </p>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <Reveal delay={0}>
            <div className="rounded-2xl border border-sand bg-cream p-8">
              <h3 className="font-display text-xl mb-5">Подходяща е, ако:</h3>
              <ul className="space-y-3">
                {forWhom.map((item, i) =>
                  <li key={i} className="flex gap-3 text-[14px] text-ink-soft leading-snug">
                    <span className="mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full bg-peach mt-2"></span>
                    {item}
                  </li>
                )}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-sand bg-cream p-8">
              <h3 className="font-display text-xl mb-5">Как протича:</h3>
              <ul className="space-y-4">
                {steps.map((s, i) =>
                  <li key={i} className="flex gap-3 text-[14px] text-ink-soft leading-snug">
                    <span className="text-lg shrink-0">{s.icon}</span>
                    {s.text}
                  </li>
                )}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="rounded-2xl border border-sand bg-lavender-soft p-8">
              <h3 className="font-display text-xl mb-5">Ефектът:</h3>
              <ul className="space-y-3">
                {effects.map((item, i) =>
                  <li key={i} className="flex gap-3 text-[14px] text-ink leading-snug">
                    <span className="mt-2 shrink-0 h-1.5 w-1.5 rounded-full bg-lavender"></span>
                    {item}
                  </li>
                )}
              </ul>
              <p className="mt-6 text-[12px] text-ink-soft leading-relaxed border-t border-sand pt-4">
                Процесът не замества дългосрочна психотерапия. Той е концентрирана практика, която подпомага личния процес и дава посока за следващи стъпки.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CTA variant="primary">Пишете ми в Instagram</CTA>
            <span className="text-[12px] uppercase tracking-[0.22em] text-ink-soft">Следваща дата · обявяваме скоро</span>
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
      <About />
      <Program />

      <Consultations />
      <Testimonials />
      <FAQ />
      <ContactFooter />
    </main>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
