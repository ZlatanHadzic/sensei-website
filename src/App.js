import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Trophy,
  Users,
  Clock,
  Medal,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Shield,
  Swords,
  Target,
  Heart,
  CheckCircle,
  Quote,
  Send,
  ChevronDown,
  Award,
  
} from "lucide-react";

/* ─── Intersection Observer hook ─── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, isInView];
}

/* ─── Animated Counter ─── */
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Main App ─── */
export default function KarateKlubSensei() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeProgram, setActiveProgram] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const [heroRef, heroInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [coachRef, coachInView] = useInView();
  const [programRef, programInView] = useInView();
  const [galleryRef, galleryInView] = useInView();
  const [testimonialRef, testimonialInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  const navLinks = [
    { label: "Početna", id: "hero" },
    { label: "O nama", id: "about" },
    { label: "Programi", id: "programs" },
    { label: "Utisci", id: "testimonials" },
    { label: "Kontakt", id: "contact" },
  ];

  const programs = [
    {
      icon: <Heart className="w-7 h-7" />,
      title: "Karate škola za djecu",
      age: "5 – 14 godina",
      desc: "Djeca uče karate kroz strukturirane vježbe i igru. Fokus je na motorici, pažnji i samokontroli — vještinama koje im pomažu i van sale.",
      features: ["Razvoj motoričkih sposobnosti", "Disciplina i fokus", "Socijalizacija i timski rad", "Priprema za takmičenja"],
    },
    {
      icon: <Trophy className="w-7 h-7" />,
      title: "Takmičarski tim",
      age: "12+ godina",
      desc: "Za one koji žele ići dalje od treninga. Naš takmičarski tim nastupa na domaćim i međunarodnim takmičenjima s dokazanim rezultatima.",
      features: ["Profesionalni treninzi", "Domaća i međunarodna takmičenja", "Individualni pristup", "Mentorstvo od bivših šampiona"],
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: "Individualni treninzi",
      age: "Sve uzraste",
      desc: "Rad jedan na jedan, prilagođen tebi. Bilo da se pripremate za ispit za pojas, takmičenje ili jednostavno želite napredovati brže.",
      features: ["Prilagođen plan treninga", "Fleksibilan raspored", "Brži napredak", "Rad na specifičnim tehnikama"],
    },
  ];

  const coaches = [
    {
      name: "Merita Tirić-Čampara",
      role: "Osnivačica & Glavna trenerica",
      bio: "Suosnivačica kluba 1996. godine. Merita je godinama bila ime karatea u Sarajevu — i kao takmičarka, i kao trenerica koja je iznjedrila generacije prvaka.",
      belt: "5. Dan",
      initials: "MT",
    },
    {
      name: "Mensur Sladić",
      role: "Osnivač & Trener",
      bio: "Suosnivač kluba i bivši reprezentativac BiH. Mensur je poznat po tehničkoj preciznosti i sposobnosti da iz svakog takmičara izvuče ono najbolje.",
      belt: "4. Dan",
      initials: "MS",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Bebas+Neue&family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap');

        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
        .font-accent  { font-family: 'Noto Serif', serif; }

        html { scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        .animate-fadeUp    { animation: fadeUp 0.8s ease-out forwards; }
        .animate-fadeIn    { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideRight{ animation: slideInRight 0.8s ease-out forwards; }
        .animate-scaleIn   { animation: scaleIn 0.6s ease-out forwards; }
        .animate-float     { animation: float 3s ease-in-out infinite; }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }

        .gradient-text {
          background: linear-gradient(135deg, #D32F2F, #FF6659);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        }

        .card-hover { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.12);
        }

        .btn-primary {
          background: #D32F2F;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .btn-primary:hover {
          background: #B71C1C;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(211,47,47,0.4);
        }

        .stat-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: #D32F2F;
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .stat-card:hover::before { transform: scaleX(1); }

        .gallery-item { overflow: hidden; border-radius: 1rem; }
        .gallery-item img { transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); }
        .gallery-item:hover img { transform: scale(1.06); }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #D32F2F; border-radius: 4px; }
      `}</style>

      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-3" : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-display text-xl tracking-wide transition-all duration-300 ${
                scrolled ? "bg-neutral-900 text-white" : "bg-white text-neutral-900"
              }`}>S</div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-600 rounded-full opacity-80"></div>
            </div>
            <div className={`transition-colors duration-300 ${scrolled ? "text-neutral-900" : "text-white"}`}>
              <div className="font-display text-xl tracking-wider leading-none">SENSEI</div>
              <div className="text-xs tracking-widest opacity-60 font-light">KARATE KLUB</div>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 ${
                  scrolled
                    ? "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo("contact")} className="btn-primary ml-4 px-6 py-2.5 text-white text-sm font-semibold rounded-lg relative z-10">
              Upiši se odmah
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-neutral-900" : "text-white"}`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-neutral-100 animate-fadeIn">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollTo(link.id)} className="text-left px-4 py-3 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg font-medium transition-colors">
                  {link.label}
                </button>
              ))}
              <button onClick={() => scrollTo("contact")} className="btn-primary mt-3 px-6 py-3 text-white font-semibold rounded-lg text-center relative z-10">
                Upiši se odmah
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 40%, #111 100%)" }}>
        <div className="absolute inset-0 noise-overlay"></div>
        {/* Large kanji background */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="500" fontFamily="Bebas Neue" fill="white" opacity="0.3">空</text>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-600/20 to-transparent pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-32 lg:py-0 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left content */}
            <div className={heroInView ? "animate-slideLeft" : "opacity-0"}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-white/60 text-sm font-medium tracking-wide">Osnovan 1996. godine</span>
              </div>

              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white leading-none tracking-wide mb-6">
                TRADICIJA
                <br />
                <span className="gradient-text">ŠAMPIONA</span>
                <br />
                OD 1996.
              </h1>

              <p className="text-white/55 text-lg lg:text-xl leading-relaxed max-w-lg mb-10 font-light">
                Više od 25 godina treniramo djecu, mlade i odrasle — na istom tatamiju gdje su nastajali šampioni.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => scrollTo("contact")} className="btn-primary px-8 py-4 text-white font-semibold text-lg rounded-xl flex items-center justify-center gap-3 relative z-10">
                  Upiši se odmah
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => scrollTo("programs")} className="px-8 py-4 text-white/70 hover:text-white font-medium text-lg rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3">
                  Pogledaj programe
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right — framed photo */}
     
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20"></div>
            <ChevronDown className="w-4 h-4 text-white/30" />
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative z-10 -mt-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { number: 25,   suffix: "+", label: "Godina tradicije",   icon: <Clock  className="w-5 h-5" /> },
              { number: 1000, suffix: "+", label: "Osvojenih medalja",  icon: <Medal  className="w-5 h-5" /> },
              { number: 20,   suffix: "+", label: "Majstora karatea",   icon: <Users  className="w-5 h-5" /> },
            ].map((stat, i) => (
              <div key={i} className="stat-card relative p-8 text-center group cursor-default overflow-hidden">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="font-display text-5xl text-neutral-900 tracking-wide mb-1">
                  <Counter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-neutral-500 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="py-32 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div ref={aboutRef} className={`grid lg:grid-cols-2 gap-20 items-center ${aboutInView ? "" : "opacity-0"}`}>

            {/* Photo */}
            <div className={aboutInView ? "animate-slideLeft" : ""}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&w=800&q=80"
                    alt="Karate Klub Sensei trening"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white/70 text-sm font-accent italic">
                      "Put od hiljadu milja počinje jednim korakom"
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl shadow-black/10 max-w-xs animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-neutral-900">95%</div>
                      <div className="text-xs text-neutral-500">trenera su bivši šampioni</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={aboutInView ? "animate-slideRight delay-200" : ""}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                O klubu
              </div>

              <h2 className="font-display text-5xl lg:text-6xl text-neutral-900 tracking-wide mb-6 leading-none">
                VIŠE OD SPORTA.
                <br />
                <span className="gradient-text">ŽIVOTNA ŠKOLA.</span>
              </h2>

              <p className="text-neutral-500 text-lg leading-relaxed mb-6">
                Karate Klub Sensei osnovan je 1996. godine u Sarajevu. Iza toga stoje dvoje ljudi —{" "}
                <strong className="text-neutral-900">Merita Tirić-Čampara</strong> i{" "}
                <strong className="text-neutral-900">Mensur Sladić</strong> — koji su u to vrijeme imali samo jednu ideju: napraviti klub u kojem se radi ozbiljno, ali u kom svako ima mjesto.
              </p>

              <p className="text-neutral-500 text-lg leading-relaxed mb-8">
                Trideset godina i hiljade treninga kasnije, klub je i dalje njihov. Sa timom u kom{" "}
                <strong className="text-neutral-900">95% trenera dolazi iz redova kluba</strong>, ovdje se ne podučava samo karate — podučava se mentalitet.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {["Licencirani treneri", "Moderni dojo", "Svi uzrasti", "Dokazani rezultati"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></div>
                    <span className="text-neutral-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => scrollTo("programs")} className="group inline-flex items-center gap-3 text-red-600 font-semibold text-lg hover:gap-5 transition-all duration-300">
                Saznaj više o programima
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ COACHES ═══════════════ */}
      <section className="py-24 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay"></div>
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-red-600/8 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div ref={coachRef} className={coachInView ? "" : "opacity-0"}>

            <div className={`mb-16 ${coachInView ? "animate-fadeUp" : ""}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                Osnivači i treneri
              </div>
              <h2 className="font-display text-5xl lg:text-6xl text-white tracking-wide leading-none">
                LJUDI IZA <span className="gradient-text">KLUBA</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {coaches.map((coach, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border border-white/5 bg-white/3 backdrop-blur p-8 transition-all duration-500 hover:border-red-600/30 hover:bg-white/5 ${coachInView ? "animate-fadeUp" : ""}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="flex items-start gap-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-red-600 flex items-center justify-center font-display text-2xl text-white tracking-wider">
                        {coach.initials}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-neutral-900 border border-white/10 px-2 py-0.5 rounded-full">
                        <span className="text-red-400 text-xs font-semibold">{coach.belt}</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-2xl text-white tracking-wide mb-1">{coach.name}</h3>
                      <p className="text-red-400 text-sm font-medium mb-4">{coach.role}</p>
                      <p className="text-white/50 text-sm leading-relaxed">{coach.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROGRAMS ═══════════════ */}
      <section id="programs" className="py-32 bg-neutral-50 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
        <div className="absolute inset-0 noise-overlay opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div ref={programRef} className={programInView ? "" : "opacity-0"}>
            <div className={`text-center mb-20 ${programInView ? "animate-fadeUp" : ""}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
                <Swords className="w-4 h-4" />
                Naši programi
              </div>
              <h2 className="font-display text-5xl lg:text-6xl text-neutral-900 tracking-wide mb-4 leading-none">
                PRONAĐI SVOJ <span className="gradient-text">PUT</span>
              </h2>
              <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                Bez obzira na godine ili iskustvo, postoji program koji odgovara tebi.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {programs.map((prog, i) => (
                <div
                  key={i}
                  onClick={() => setActiveProgram(i)}
                  className={`card-hover cursor-pointer rounded-2xl p-8 border-2 transition-all duration-500 ${
                    activeProgram === i
                      ? "bg-neutral-900 border-neutral-900 text-white"
                      : "bg-white border-neutral-100 hover:border-neutral-200"
                  } ${programInView ? "animate-fadeUp" : ""}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${
                    activeProgram === i ? "bg-red-600 text-white" : "bg-red-50 text-red-600"
                  }`}>
                    {prog.icon}
                  </div>

                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4 ${
                    activeProgram === i ? "bg-white/10 text-white/80" : "bg-neutral-100 text-neutral-500"
                  }`}>
                    {prog.age}
                  </div>

                  <h3 className="font-display text-3xl tracking-wide mb-4">{prog.title}</h3>
                  <p className={`text-base leading-relaxed mb-6 ${activeProgram === i ? "text-white/60" : "text-neutral-500"}`}>
                    {prog.desc}
                  </p>

                  <div className="space-y-3">
                    {prog.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <CheckCircle className={`w-4 h-4 flex-shrink-0 ${activeProgram === i ? "text-red-400" : "text-red-600"}`} />
                        <span className={`text-sm ${activeProgram === i ? "text-white/70" : "text-neutral-600"}`}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); scrollTo("contact"); }}
                    className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                      activeProgram === i
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    Prijavi se
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={galleryRef} className={galleryInView ? "" : "opacity-0"}>
            <div className={`flex items-end justify-between mb-12 ${galleryInView ? "animate-fadeUp" : ""}`}>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-4">
                  <Star className="w-4 h-4" />
                  Iz kluba
                </div>
                <h2 className="font-display text-5xl lg:text-6xl text-neutral-900 tracking-wide leading-none">
                  NAŠI <span className="gradient-text">TRENUCI</span>
                </h2>
              </div>
              <p className="hidden md:block text-neutral-400 text-sm max-w-xs text-right leading-relaxed">
                Sa takmičenja, treninga i svega što čini Sensei onim što jeste.
              </p>
            </div>

            <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 ${galleryInView ? "animate-fadeUp delay-200" : ""}`}>
              <div className="gallery-item row-span-2">
                <img src={galleryImages[0]} alt="" className="w-full h-full object-cover" style={{ minHeight: "400px" }} />
              </div>
              <div className="gallery-item">
                <img src={galleryImages[1]} alt="" className="w-full h-64 object-cover" />
              </div>
              <div className="gallery-item">
                <img src={galleryImages[2]} alt="" className="w-full h-64 object-cover" />
              </div>
              <div className="gallery-item">
                <img src={galleryImages[3]} alt="" className="w-full h-64 object-cover" />
              </div>
              <div className="gallery-item">
                <img src={galleryImages[4]} alt="" className="w-full h-64 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="testimonials" className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
        <div className="absolute top-10 right-10 opacity-3">
          <Quote className="w-96 h-96 text-neutral-200" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div ref={testimonialRef} className={testimonialInView ? "" : "opacity-0"}>
            <div className={`text-center mb-20 ${testimonialInView ? "animate-fadeUp" : ""}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Utisci
              </div>
              <h2 className="font-display text-5xl lg:text-6xl text-neutral-900 tracking-wide mb-4 leading-none">
                GLASOVI <span className="gradient-text">NAŠIH ČLANOVA</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Main testimonial */}
              <div className={`md:col-span-2 bg-neutral-900 rounded-3xl p-10 lg:p-14 relative overflow-hidden ${testimonialInView ? "animate-fadeUp delay-100" : ""}`}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative">
                  <Quote className="w-12 h-12 text-red-600 mb-6" />
                  <blockquote className="font-accent text-xl lg:text-2xl text-white/80 italic leading-relaxed mb-8">
                    "Karate Klub Sensei je bio moj drugi dom. Merita i Mensur su znali kako da od djeteta naprave sportaša, ali i čovjeka. Sve što sam postigao na takmičenjima, pa i u životu, vučem korijene odavde."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center font-display text-xl text-white">
                      TK
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Tarik Kovačević</div>
                      <div className="text-white/50 text-sm">Višestruki prvak BiH · 80+ medalja · Bivši član KK Sensei</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary testimonials */}
              <div className={`bg-white border border-neutral-100 rounded-2xl p-8 card-hover ${testimonialInView ? "animate-fadeUp delay-300" : ""}`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-neutral-600 leading-relaxed mb-6 font-accent italic">
                  "Sin je upisao Sensei sa sedam godina, bez ikakvog iskustva. Sad ima deset, takmičarski je karatista i — što mi je najvažnije — ozbiljniji je i mirniji nego ikad bio."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-bold text-neutral-600">AH</div>
                  <div>
                    <div className="font-bold text-neutral-900 text-sm">Amir H.</div>
                    <div className="text-neutral-400 text-xs">Roditelj člana kluba</div>
                  </div>
                </div>
              </div>

              <div className={`bg-white border border-neutral-100 rounded-2xl p-8 card-hover ${testimonialInView ? "animate-fadeUp delay-400" : ""}`}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-neutral-600 leading-relaxed mb-6 font-accent italic">
                  "Trenirala sam u nekoliko klubova, ali nigdje nisam naišla na ovakav pristup. Vide te kao osobu, ne samo kao broj na tatamiju."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-bold text-neutral-600">SB</div>
                  <div>
                    <div className="font-bold text-neutral-900 text-sm">Selma B.</div>
                    <div className="text-neutral-400 text-xs">Bivša takmičarka</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section ref={ctaRef} className="py-24 bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className={`relative max-w-4xl mx-auto px-6 text-center ${ctaInView ? "animate-fadeUp" : "opacity-0"}`}>
          <h2 className="font-display text-5xl lg:text-7xl text-white tracking-wide mb-6 leading-none">
            SPREMAN ZA
            <br />
            <span className="gradient-text">PRVI KORAK?</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Dođi na probni trening — besplatno. Vidi kako izgleda, osjeti atmosferu, pa odluči.
          </p>
          <button onClick={() => scrollTo("contact")} className="btn-primary px-10 py-5 text-white font-semibold text-lg rounded-xl inline-flex items-center gap-3 relative z-10">
            Zakaži besplatan trening
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section id="contact" className="py-32 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Kontakt & Lokacija
            </div>
            <h2 className="font-display text-5xl lg:text-6xl text-neutral-900 tracking-wide mb-4 leading-none">
              DOĐI NA <span className="gradient-text">TRENING</span>
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              Posjeti nas ili pošalji upit — javit ćemo se brzo.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-1">Lokacija</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                      Bjelave / Centar<br />Sarajevo, Bosna i Hercegovina
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-1">Telefon</h4>
                    <p className="text-neutral-500 text-sm">+387 61 XXX XXX</p>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-1">Email</h4>
                    <p className="text-neutral-500 text-sm">info@karatesenseisar.ba</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a href="#facebook" className="w-12 h-12 rounded-xl bg-neutral-900 hover:bg-red-600 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#instagram" className="w-12 h-12 rounded-xl bg-neutral-900 hover:bg-red-600 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5 text-white fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-neutral-100 p-8 lg:p-10 shadow-xl shadow-black/5">
                <h3 className="font-display text-3xl text-neutral-900 tracking-wide mb-2">POŠALJI UPIT</h3>
                <p className="text-neutral-500 text-sm mb-8">Popuni formu i javit ćemo ti se u roku od 24 sata.</p>

                {formSent ? (
                  <div className="text-center py-16 animate-scaleIn">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h4 className="font-display text-2xl text-neutral-900 tracking-wide mb-2">PORUKA POSLANA!</h4>
                    <p className="text-neutral-500">Javit ćemo ti se uskoro. Hvala na interesovanju!</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">Ime i prezime</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Vaše ime i prezime"
                        className="w-full px-5 py-3.5 rounded-xl border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@primjer.ba"
                          className="w-full px-5 py-3.5 rounded-xl border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-2">Telefon</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+387 6X XXX XXX"
                          className="w-full px-5 py-3.5 rounded-xl border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">Poruka</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Recite nam u čemu možemo pomoći..."
                        className="w-full px-5 py-3.5 rounded-xl border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/10 transition-all resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="btn-primary w-full py-4 text-white font-semibold rounded-xl flex items-center justify-center gap-3 text-lg relative z-10"
                    >
                      <Send className="w-5 h-5" />
                      Pošalji poruku
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="bg-neutral-900 pt-20 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center font-display text-xl text-neutral-900">S</div>
                <div>
                  <div className="font-display text-xl text-white tracking-wider">SENSEI</div>
                  <div className="text-xs text-white/40 tracking-widest">KARATE KLUB</div>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Od 1996. godine, u Sarajevu. Isti tatami, isti principi.
              </p>
            </div>

            <div>
              <h4 className="font-display text-lg text-white tracking-wider mb-6">LINKOVI</h4>
              <div className="space-y-3">
                {navLinks.map((link) => (
                  <button key={link.id} onClick={() => scrollTo(link.id)} className="block text-white/40 hover:text-white text-sm transition-colors">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display text-lg text-white tracking-wider mb-6">KONTAKT</h4>
              <div className="space-y-3 text-white/40 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                  Bjelave / Centar, Sarajevo
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                  +387 61 XXX XXX
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                  info@karatesenseisar.ba
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-sm">© 2025 Karate Klub Sensei. Sva prava zadržana.</p>
            <div className="flex gap-3">
              <a href="#facebook" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-600 flex items-center justify-center transition-colors duration-300">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#instagram" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-600 flex items-center justify-center transition-colors duration-300">
                <svg className="w-4 h-4 text-white fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
