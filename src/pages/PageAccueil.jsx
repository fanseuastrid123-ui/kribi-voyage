import { useEffect, useRef, useState } from 'react'

// ── Vraies photos de la destination ──────────────────────────────────────────
const HERO_SLIDES = [
  { src: '/imgs/kribi8.jpeg',  label: 'Chutes de la Lobé · Excursion en pirogue' },
  { src: '/imgs/kribi3.jpeg',  label: 'La piscine de l\'hôtel · face à la plage' },
  { src: '/imgs/kribi4.jpeg',  label: 'chambre' },
  { src: '/imgs/kribi1.jpeg',  label: 'Terrasse & jardins · vue palmiers' },
]

const GALLERY = [
  { src: '/imgs/kribi8.jpeg',  label: 'Chutes de la Lobé',     col: 'col-span-2 row-span-2' },
  { src: '/imgs/kribi3.jpeg',  label: 'Piscine de l\'hôtel',   col: '' },
  { src: '/imgs/kribi4.jpeg',  label: 'Chambre',       col: '' },
  { src: '/imgs/kribi1.jpeg',  label: 'Terrasse & jardins',    col: '' },
  { src: '/imgs/kribi2.jpeg',  label: 'Vue sur l\'océan',      col: '' },
  { src: '/imgs/kribi5.jpeg',  label: 'Plage',          col: '' },
  { src: '/imgs/kribi6.jpeg',  label: 'Accès à la plage',      col: '' },
  { src: '/imgs/kribi9.jpeg',  label: 'Jardin & océan',        col: '' },
]

const STATS = [
  { value: '150', label: 'Places disponibles',  color: 'text-emerald-400' },
  { value: '4',   label: 'Jours d\'aventure',   color: 'text-cyan-400'    },
  { value: '60K', label: 'FCFA par étudiant',   color: 'text-amber-400'   },
  { value: '1',   label: 'Expérience unique',   color: 'text-pink-400'    },
]

const FEATURES = [
  { icon: '🏖️', title: 'Plage Privée',          desc: 'Accès direct à la plage de sable fin avec vue sur l\'Océan Atlantique.', color: 'from-cyan-500/20 to-blue-500/10',     border: 'border-cyan-500/25'    },
  { icon: '🌊', title: 'Chutes de la Lobé',     desc: 'Excursion en pirogue vers les chutes — phénomène naturel unique au monde.', color: 'from-blue-500/20 to-indigo-500/10',  border: 'border-blue-500/25'    },
  { icon: '🏊', title: 'Piscine & Détente',     desc: 'Profitez de la piscine de l\'hôtel directement face à la mer.', color: 'from-teal-500/20 to-cyan-500/10',    border: 'border-teal-500/25'    },
  { icon: '🛶', title: 'Pirogue sur le Ntem',   desc: 'Navigation en pirogue traditionnelle et rencontre des communautés locales.', color: 'from-amber-500/20 to-orange-500/10', border: 'border-amber-500/25'   },
  { icon: '🍽️', title: 'Gastronomie Locale',   desc: 'Poisson braisé, ndolé, sanga — la richesse culinaire camerounaise.', color: 'from-orange-500/20 to-red-500/10',    border: 'border-orange-500/25'  },
  { icon: '🎊', title: 'Soirée de Gala',        desc: 'Dîner de gala, musiques et danses traditionnelles pour clôturer le voyage.', color: 'from-purple-500/20 to-pink-500/10',  border: 'border-purple-500/25'  },
]

function useIntersection(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.12 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function AnimSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const visible = useIntersection(ref)
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
      }}
    >
      {children}
    </div>
  )
}

export default function PageAccueil({ setActiveTab, spotsLeft, total }) {
  const filled = total - spotsLeft
  const pct    = Math.round((filled / total) * 100)
  const [activeImg,  setActiveImg]  = useState(0)
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    setHeroLoaded(true)
    const iv = setInterval(() => setActiveImg((i) => (i + 1) % HERO_SLIDES.length), 5000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950">

      {/* ══ HERO ═══════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-screen flex items-end overflow-hidden">

        {/* Slideshow des vraies photos */}
        {HERO_SLIDES.map((s, i) => (
          <img
            key={i}
            src={s.src}
            alt={s.label}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1800ms] ${i === activeImg ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Particules flottantes */}
        {[...Array(7)].map((_, i) => (
          <div key={i} className="hero-particle bg-emerald-400/25 rounded-full" style={{
            width: `${6 + i * 3}px`, height: `${6 + i * 3}px`,
            left: `${10 + i * 12}%`,
            animationDuration: `${9 + i * 1.8}s`,
            animationDelay: `${i * 1.3}s`,
          }} />
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/55 to-gray-950/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/75 via-transparent to-transparent" />

        {/* Contenu hero */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20">
          <div className="max-w-3xl">

            <div className={`transition-all duration-1000 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <span className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Organisé par Odyssey × Sigma · Université CDPE
              </span>
            </div>

            <div className={`transition-all duration-1000 delay-200 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-2">Voyage à</h1>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6">
                <span className="shimmer-text">Kribi</span>
                <span className="text-white/30 ml-4 text-4xl md:text-5xl align-middle">🇨🇲</span>
              </h1>
            </div>

            <div className={`transition-all duration-1000 delay-300 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-8">
                Plages paradisiaques, piscine face à l'océan, chutes de la Lobé et aventure en pirogue —
                vivez une expérience inoubliable au cœur du Cameroun.
              </p>
            </div>

            <div className={`flex flex-wrap gap-3 mb-10 transition-all duration-1000 delay-400 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {[
                { icon: '📅', text: '14 – 17 Mai 2026' },
                { icon: '⏱️', text: '4 jours / 3 nuits' },
                { icon: '💰', text: '60 000 FCFA' },
                { icon: '👥', text: '150 places seulement' },
              ].map((p) => (
                <span key={p.text} className="flex items-center gap-2 bg-white/8 border border-white/15 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
                  {p.icon} {p.text}
                </span>
              ))}
            </div>

            <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-500 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button
                onClick={() => setActiveTab('inscription')}
                className="group relative bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-all text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-emerald-500/40 text-base overflow-hidden"
              >
                <span className="relative z-10">✍️ S'inscrire maintenant</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => setActiveTab('programme')}
                className="bg-white/10 hover:bg-white/18 border border-white/20 backdrop-blur-md transition-all text-white font-semibold px-8 py-4 rounded-2xl text-base"
              >
                📅 Voir le programme
              </button>
            </div>
          </div>
        </div>

        {/* Dots slideshow */}
        <div className="absolute bottom-6 right-8 z-10 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setActiveImg(i)}
              className={`rounded-full transition-all duration-300 ${i === activeImg ? 'w-6 h-2 bg-emerald-400' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>

        {/* Label slide actif */}
        <div className="absolute bottom-6 left-6 z-10">
          <span className="text-xs text-gray-300 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
            📍 {HERO_SLIDES[activeImg].label}
          </span>
        </div>
      </div>

      {/* ══ STATS BAR ═════════════════════════════════════════════════════════ */}
      <div className="bg-gray-900/80 border-y border-white/8 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p className={`text-4xl md:text-5xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PROGRESS PLACES ═══════════════════════════════════════════════════ */}
      <AnimSection className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gray-900 border border-white/8 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="text-center shrink-0">
              <p className={`text-6xl font-black ${spotsLeft <= 10 ? 'text-orange-400' : 'text-emerald-400'}`}>{spotsLeft}</p>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">places restantes</p>
            </div>
            <div className="flex-1 md:w-72">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>{filled} inscrits</span>
                <span>{total} places totales</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${spotsLeft <= 10 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">{pct}% des places remplies</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('inscription')}
            className="shrink-0 bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition text-white font-bold px-8 py-4 rounded-2xl text-sm shadow-lg shadow-emerald-500/25 whitespace-nowrap"
          >
            Réserver ma place →
          </button>
        </div>
      </AnimSection>

      {/* ══ GALERIE VRAIES PHOTOS ═════════════════════════════════════════════ */}
      <AnimSection className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 block">Photos réelles du séjour</span>
          <h2 className="text-3xl md:text-4xl font-black text-white">Aperçu du lieu</h2>
          <p className="text-gray-400 mt-2 text-sm">Voici à quoi ressemble votre hébergement et les activités</p>
        </div>

        {/* Grille asymétrique avec les vraies photos */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[160px]">
          {/* Grande image hero - Chutes de la Lobé */}
          <div className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl group card-hover cursor-pointer">
            <img src="/imgs/kribi8.jpeg" alt="Chutes de la Lobé" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block bg-emerald-500/80 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-1.5">⭐ Incontournable</span>
              <p className="text-white font-black text-lg leading-tight">Chutes de la Lobé</p>
              <p className="text-emerald-300 text-xs">Excursion en pirogue</p>
            </div>
          </div>

          {/* Piscine */}
          <div className="relative overflow-hidden rounded-2xl group card-hover cursor-pointer">
            <img src="/imgs/kribi3.jpeg" alt="Piscine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <p className="absolute bottom-2 left-3 text-white text-xs font-bold">🏊 Piscine</p>
          </div>

          {/* Bord de piscine */}
          <div className="relative overflow-hidden rounded-2xl group card-hover cursor-pointer">
            <img src="/imgs/kribi10.jpeg" alt="Détente piscine" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <p className="absolute bottom-2 left-3 text-white text-xs font-bold">☀️ Détente</p>
          </div>

          {/* Terrasse */}
          <div className="relative overflow-hidden rounded-2xl group card-hover cursor-pointer">
            <img src="/imgs/kribi1.jpeg" alt="Terrasse" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <p className="absolute bottom-2 left-3 text-white text-xs font-bold">🌴 Terrasse</p>
          </div>

          {/* Balançoires océan */}
          <div className="relative overflow-hidden rounded-2xl group card-hover cursor-pointer">
            <img src="/imgs/kribi2.jpeg" alt="Vue océan" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <p className="absolute bottom-2 left-3 text-white text-xs font-bold">🌊 Vue océan</p>
          </div>

          {/* Plage */}
          <div className="col-span-2 relative overflow-hidden rounded-2xl group card-hover cursor-pointer">
            <img src="/imgs/kribi5.jpeg" alt="Plage" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <p className="absolute bottom-2 left-3 text-white text-xs font-bold">🏖️ Plage </p>
          </div>

          {/* Accès plage */}
          <div className="relative overflow-hidden rounded-2xl group card-hover cursor-pointer">
            <img src="/imgs/kribi6.jpeg" alt="Accès plage" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <p className="absolute bottom-2 left-3 text-white text-xs font-bold">🌿 Accès plage</p>
          </div>

          {/* Chambre */}
          <div className="relative overflow-hidden rounded-2xl group card-hover cursor-pointer">
            <img src="/imgs/kribi9.jpeg" alt="Jardin" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <p className="absolute bottom-2 left-3 text-white text-xs font-bold">🌊 Vue jardin</p>
          </div>
        </div>
      </AnimSection>

      {/* ══ FEATURES ══════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <AnimSection className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 block">Au programme</span>
          <h2 className="text-3xl md:text-4xl font-black text-white">Ce qui vous attend</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">4 jours d'expériences uniques en plein cœur du Cameroun</p>
        </AnimSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <AnimSection key={f.title} delay={i * 80}>
              <div className={`group bg-gradient-to-br ${f.color} border ${f.border} rounded-2xl p-6 card-hover h-full`}>
                <div className="w-12 h-12 rounded-xl bg-white/8 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </div>

      {/* ══ SECTION INCLUS avec photo ═════════════════════════════════════════ */}
      <AnimSection className="max-w-7xl mx-auto px-4 pb-14">
        <div className="bg-gray-900 border border-white/8 rounded-3xl p-8 md:p-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 block">Tout inclus</span>
              <h2 className="text-3xl font-black text-white mb-4">
                Ce qui est inclus<br />
                dans <span className="shimmer-text">60 000 FCFA</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Un tarif tout compris pour profiter pleinement du voyage sans surprises ni frais cachés.
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  '🚌 Transport aller-retour',
                  '🏨 Hébergement 3 nuits',
                  '🍽️ Repas (pension complète)',
                  '🛡️ Assurance voyage',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-sm text-gray-300">
                    <span className="text-emerald-400">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Photo piscine + plage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-2 h-72">
                <img src="/imgs/kribi3.jpeg" alt="chambre" className="rounded-2xl w-full h-full object-cover row-span-2" />
                <img src="/imgs/kribi1.jpeg" alt="Terrasse" className="rounded-xl w-full h-32 object-cover" />
                <img src="/imgs/kribi2.jpeg" alt="Balançoires" className="rounded-xl w-full h-32 object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-2 bg-emerald-500 text-white font-black text-xl px-5 py-3 rounded-2xl shadow-xl shadow-emerald-500/30">
                60 000 FCFA
                <p className="text-emerald-200 text-xs font-medium">tout compris</p>
              </div>
            </div>
          </div>
        </div>
      </AnimSection>

      {/* ══ CTA FINAL ═════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden gradient-animate py-20 px-4 text-center">
        {/* Background image subtile */}
        <img src="/imgs/kribi5.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950/60" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Ne ratez pas<br />cette aventure !</h2>
          <p className="text-emerald-200 mb-8 text-base leading-relaxed">
            Seulement <strong>{spotsLeft} places</strong> restantes sur {total}.<br />
            Inscrivez-vous maintenant pour garantir votre participation.
          </p>
          <button
            onClick={() => setActiveTab('inscription')}
            className="group bg-white text-emerald-800 font-black px-10 py-5 rounded-2xl hover:bg-emerald-50 transition active:scale-95 shadow-2xl text-base"
          >
            <span>✍️ S'inscrire — 60 000 FCFA</span>
            <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
          </button>
          <p className="text-emerald-300/60 text-xs mt-4">Organisé par Odyssey × Sigma pour l'Université CDPE</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-white/5 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-wave inline-block">🌴</span>
            <div>
              <p className="text-white font-black text-sm">Odyssey × Sigma</p>
              <p className="text-gray-500 text-xs">Université CDPE · Voyage Kribi 2026</p>
            </div>
          </div>
          <p className="text-gray-600 text-xs text-center">© 2026 — Voyage d'Études · Kribi, Cameroun · 14–17 Mai 2026</p>
          <div className="flex items-center gap-4 text-gray-500 text-xs">
            <span>📞 694 881 471</span>
            <span>•</span>
            <span>📞 683 916 631</span>
          </div>
        </div>
      </footer>
    </div>
  )
}