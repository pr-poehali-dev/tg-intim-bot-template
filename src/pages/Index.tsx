import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PROFILES = [
  { name: "Алина", age: 24, emoji: "🌸", city: "Москва", tag: "Ищет приключений" },
  { name: "Дима", age: 27, emoji: "🔥", city: "СПб", tag: "Открыт к общению" },
  { name: "Катя", age: 22, emoji: "✨", city: "Казань", tag: "Новые знакомства" },
  { name: "Макс", age: 29, emoji: "🎯", city: "Москва", tag: "Серьёзно настроен" },
];

const FEATURES = [
  {
    icon: "MessageCircle",
    label: "Анонимные чаты",
    desc: "Общайтесь без раскрытия личных данных — ник и аватар на ваш выбор",
    color: "from-pink-500/20 to-transparent",
    glow: "rgba(255,61,135,0.3)",
  },
  {
    icon: "Heart",
    label: "Взаимные симпатии",
    desc: "Лайкнули друг друга — бот мгновенно соединяет вас в чате",
    color: "from-purple-500/20 to-transparent",
    glow: "rgba(178,79,255,0.3)",
  },
  {
    icon: "SlidersHorizontal",
    label: "Умные фильтры",
    desc: "Пол, возраст, город, предпочтения — находите только тех, кто интересен",
    color: "from-orange-500/20 to-transparent",
    glow: "rgba(255,112,67,0.3)",
  },
  {
    icon: "Bell",
    label: "Умные уведомления",
    desc: "Мгновенные пуши о взаимных лайках и новых сообщениях прямо в Telegram",
    color: "from-pink-500/20 to-transparent",
    glow: "rgba(255,61,135,0.3)",
  },
];

const STEPS = [
  { num: "01", text: "Запускаешь бота", emoji: "🚀" },
  { num: "02", text: "Заполняешь профиль анонимно", emoji: "🎭" },
  { num: "03", text: "Ставишь лайки и ждёшь взаимности", emoji: "💘" },
  { num: "04", text: "Начинаешь общаться в закрытом чате", emoji: "💬" },
];

const STATS = [
  { value: "12K+", label: "активных пользователей" },
  { value: "98%", label: "анонимность гарантирована" },
  { value: "3 сек", label: "среднее время до мэтча" },
];

export default function Index() {
  const [activeCard, setActiveCard] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [matchAnim, setMatchAnim] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveCard((p) => (p + 1) % PROFILES.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const handleLike = (i: number) => {
    setLiked((p) => ({ ...p, [i]: !p[i] }));
    if (!liked[i]) {
      setMatchAnim(true);
      setTimeout(() => setMatchAnim(false), 1800);
    }
  };

  return (
    <div className="min-h-screen mesh-bg text-white overflow-x-hidden font-golos">
      {/* Match notification */}
      {matchAnim && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 neon-border-pink card-glass px-6 py-3 rounded-2xl flex items-center gap-3 animate-fade-up">
          <span className="text-2xl animate-heartbeat">💘</span>
          <span className="font-semibold text-pink-300">Взаимная симпатия!</span>
        </div>
      )}

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center">
        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 bg-pink-500 pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-15 bg-purple-600 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <span className="text-sm animate-pulse-glow">🔴</span>
            <span className="text-sm text-white/70">Бот уже работает в Telegram</span>
          </div>

          <h1 className="font-caveat text-7xl md:text-9xl font-bold mb-4 leading-none animate-fade-up delay-100">
            <span className="glow-pink" style={{ color: "var(--neon-pink)" }}>Flirt</span>
            <span className="text-white">Bot</span>
          </h1>

          <p className="font-caveat text-2xl md:text-3xl text-white/60 mb-3 animate-fade-up delay-200">
            анонимные знакомства прямо в Telegram
          </p>

          <p className="text-base md:text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-up delay-300">
            Лайки, взаимные симпатии, приватные чаты и умные фильтры — всё анонимно, всё в одном боте
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-400">
            <button className="neon-btn text-white font-semibold text-lg px-8 py-4 rounded-2xl flex items-center gap-3">
              <span>🤖</span>
              Открыть в Telegram
            </button>
            <button className="card-glass text-white/80 hover:text-white font-medium text-base px-6 py-4 rounded-2xl transition-all hover:bg-white/5 flex items-center gap-2">
              <Icon name="Play" size={16} />
              Как это работает
            </button>
          </div>
        </div>

        {/* Scrolldown hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-glow">
          <span className="text-white/30 text-sm">скролль вниз</span>
          <Icon name="ChevronDown" size={18} className="text-white/30" />
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="card-glass rounded-2xl p-6 text-center neon-border-pink animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="font-caveat text-4xl md:text-5xl font-bold mb-1"
                style={{ color: "var(--neon-pink)" }}
              >
                {s.value}
              </div>
              <div className="text-white/50 text-sm md:text-base">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-caveat text-xl text-pink-400">возможности</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              Всё что нужно для{" "}
              <span style={{ color: "var(--neon-purple)" }} className="glow-purple">
                знакомств
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="card-glass rounded-3xl p-7 flex gap-5 items-start hover:scale-[1.02] transition-transform cursor-default group"
                style={{
                  border: `1px solid rgba(255,255,255,0.06)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br"
                  style={{
                    background: `radial-gradient(circle, ${f.glow} 0%, rgba(255,255,255,0.05) 100%)`,
                    boxShadow: `0 0 20px ${f.glow}`,
                  }}
                >
                  <Icon name={f.icon} fallback="Star" size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-white">{f.label}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO CARDS */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <span className="font-caveat text-xl text-pink-400">демо-профили</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-5">
              Кто тебя{" "}
              <span style={{ color: "var(--neon-pink)" }} className="glow-pink">
                ждёт
              </span>
              ?
            </h2>
            <p className="text-white/50 text-base leading-relaxed max-w-md">
              Тысячи реальных людей уже ищут знакомства. Поставь лайк — и если симпатия взаимная, бот свяжет вас мгновенно.
            </p>
            <button className="neon-btn text-white font-semibold px-7 py-3 rounded-2xl mt-8 inline-flex items-center gap-2">
              <span>💘</span> Найти мэтч
            </button>
          </div>

          {/* Card stack */}
          <div className="flex-1 relative h-[380px] w-full max-w-[320px] mx-auto">
            {PROFILES.map((p, i) => {
              const isActive = i === activeCard;
              const offset = (i - activeCard + PROFILES.length) % PROFILES.length;
              return (
                <div
                  key={i}
                  className="absolute inset-0 card-glass rounded-3xl p-6 flex flex-col justify-between transition-all duration-700"
                  style={{
                    transform: `translateY(${offset * 12}px) scale(${1 - offset * 0.04}) translateZ(0)`,
                    zIndex: PROFILES.length - offset,
                    opacity: offset < 3 ? 1 - offset * 0.25 : 0,
                    boxShadow: isActive
                      ? "0 0 40px rgba(255,61,135,0.25), 0 20px 60px rgba(0,0,0,0.4)"
                      : "0 10px 30px rgba(0,0,0,0.3)",
                    border: isActive
                      ? "1px solid rgba(255,61,135,0.3)"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,61,135,0.2), rgba(178,79,255,0.2))",
                      }}
                    >
                      {p.emoji}
                    </div>
                    <span className="card-glass text-xs px-3 py-1 rounded-full text-white/60">
                      {p.city}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-caveat text-3xl font-bold text-white">
                      {p.name}, {p.age}
                    </h3>
                    <p className="text-white/50 text-sm mt-1">{p.tag}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="flex-1 py-3 rounded-2xl card-glass text-white/60 hover:text-white hover:bg-white/10 transition-all text-xl"
                      onClick={() => setActiveCard((activeCard + 1) % PROFILES.length)}
                    >
                      👎
                    </button>
                    <button
                      className="flex-1 py-3 rounded-2xl transition-all text-xl font-semibold"
                      style={{
                        background: liked[i]
                          ? "linear-gradient(135deg, #ff3d87, #b24fff)"
                          : "rgba(255,61,135,0.1)",
                        border: "1px solid rgba(255,61,135,0.3)",
                        color: liked[i] ? "white" : "rgba(255,61,135,0.8)",
                        boxShadow: liked[i]
                          ? "0 0 20px rgba(255,61,135,0.4)"
                          : "none",
                      }}
                      onClick={() => handleLike(i)}
                    >
                      {liked[i] ? "💖" : "❤️"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-caveat text-xl text-purple-400">как это работает</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">
              4 шага до{" "}
              <span style={{ color: "var(--neon-purple)" }} className="glow-purple">
                первого мэтча
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className="card-glass rounded-3xl p-7 flex items-start gap-5 hover:scale-[1.02] transition-transform"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div>
                  <div
                    className="font-caveat text-5xl font-bold opacity-20 leading-none mb-2"
                    style={{ color: "var(--neon-pink)" }}
                  >
                    {s.num}
                  </div>
                  <div className="text-3xl mb-2">{s.emoji}</div>
                  <p className="text-white font-medium text-lg">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANONYMOUS BLOCK */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="card-glass rounded-3xl p-10 md:p-16"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,61,135,0.12) 0%, rgba(178,79,255,0.06) 50%, transparent 100%)",
              border: "1px solid rgba(255,61,135,0.2)",
              boxShadow: "0 0 60px rgba(255,61,135,0.1)",
            }}
          >
            <div className="text-6xl mb-6 animate-float">🎭</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              100% анонимно
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-lg mx-auto">
              Никаких телефонов, имён и фото без твоего согласия. Ник, эмодзи и город — ты сам решаешь, что о себе рассказать.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["🚫 Без телефона", "🎭 Псевдоним", "🔒 Зашифровано", "👁️ Только ты решаешь"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-sm px-4 py-2 rounded-full text-white/70"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 text-center relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-pink-500 to-purple-600" />
        </div>
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-caveat text-5xl md:text-7xl font-bold mb-5">
            Готов попробовать?
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Запусти бота — первый мэтч может ждать тебя прямо сейчас
          </p>
          <button className="neon-btn text-white font-bold text-xl px-10 py-5 rounded-2xl inline-flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            Запустить FlirtBot
          </button>
          <p className="text-white/30 text-sm mt-5">
            Бесплатно · Анонимно · Только в Telegram
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t border-white/5 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto gap-4">
          <span className="font-caveat text-2xl" style={{ color: "var(--neon-pink)" }}>
            FlirtBot
          </span>
          <p className="text-white/30 text-sm">
            © 2024 FlirtBot · 18+ · Только для совершеннолетних
          </p>
          <div className="flex gap-4 text-white/40 text-sm">
            <span className="cursor-pointer hover:text-white/70 transition-colors">Условия</span>
            <span className="cursor-pointer hover:text-white/70 transition-colors">Конфиденциальность</span>
          </div>
        </div>
      </footer>
    </div>
  );
}