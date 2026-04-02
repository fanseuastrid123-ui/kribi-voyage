import { useState, useRef, useEffect } from 'react'

const DAYS = [
  {
    day: 'Jour 1',
    date: 'Jeudi 14 Mai',
    emoji: '🚌',
    theme: 'Départ & Arrivée',
    color: 'from-blue-600 to-cyan-500',
    bg: 'from-blue-900/30 to-cyan-900/10',
    border: 'border-blue-500/25',
    dot: 'bg-blue-400',
    activities: [
      { time: '06:00', icon: '🚌', title: 'Départ en bus', desc: 'Rassemblement sur le campus, départ vers Kribi.' },
      { time: '12:00', icon: '🏨', title: 'Arrivée & Check-in', desc: 'Installation dans le site, répartition des chambres.' },
      { time: '13:00', icon: '🍽️', title: 'brunch', desc: 'repas ensemble.' },
      { time: '15:00', icon: '🌅', title: 'detente', desc: 'detente personnelle dans le site.' },
      { time: '19:00', icon: '🍢', title: 'Dîner ', desc: 'Soirée de cohésion avec spécialités locales — poisson braisé.' },
      { time: '20:00', icon: '🎊', title: 'Soirée ', desc: 'Musique et danses .' },
    ],
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80',
  },
  {
    day: 'Jour 2',
    date: 'Vendredi 15 Mai',
    emoji: '🌊',
    theme: 'Nature & Découverte',
    color: 'from-emerald-600 to-teal-500',
    bg: 'from-emerald-900/30 to-teal-900/10',
    border: 'border-emerald-500/25',
    dot: 'bg-emerald-400',
    activities: [
      { time: '08:00', icon: '☀️', title: 'Petit-déjeuner', desc: 'Repas en groupe à l\'hôtel.' },
      { time: '10:00', icon: '🏭', title: 'Visites d\'entreprises', desc: 'Visites dans les entreprises sélectionnées.' },
      { time: '17:00', icon: '🍽️', title: 'Brunch', desc: 'repas ensemble.' },
      { time: '20:00', icon: '🌙', title: 'Soirée culturelle', desc: 'Musique et danses traditionnelles camerounaises.' },
    ],
    img: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=500&q=80',
  },
  {
    day: 'Jour 3',
    date: 'Samedi 16 Mai',
    emoji: '🏍️',
    theme: 'Aventure & Adrénaline',
    color: 'from-orange-600 to-red-500',
    bg: 'from-orange-900/30 to-red-900/10',
    border: 'border-orange-500/25',
    dot: 'bg-orange-400',
    activities: [
      { time: '08:00', icon: '☀️', title: 'Petit-déjeuner', desc: 'Repas en groupe.' },
      { time: '12:00', icon: '🍽️', title: 'brunch', desc: 'Repas convivial en plein air ' },
      { time: '14:00', icon: '🏖️', title: 'plage', desc: 'activite à l plage ' },
      { time: '19:00', icon: '🍽️', title: 'dinner', desc: 'Dîner en groupe ' },
      { time: '20:00', icon: '🎊', title: 'Soirée de Gala', desc: 'Dîner de gala en musique pour célébrer la fin du voyage.' },
    ],
    img: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=500&q=80',
  },
  {
    day: 'Jour 4',
    date: 'Dimanche 17 Mai',
    emoji: '🏠',
    theme: 'Retour & Souvenirs',
    color: 'from-purple-600 to-pink-500',
    bg: 'from-purple-900/30 to-pink-900/10',
    border: 'border-purple-500/25',
    dot: 'bg-purple-400',
    activities: [
      { time: '08:00', icon: '☀️', title: 'Petit-déjeuner & Check-out', desc: 'Dernier repas, rangement des chambres.' },
      { time: '09:30', icon: '📸', title: 'Séance photos souvenirs', desc: 'Photos de groupe sur la plage — moments mémorables.' },
      { time: '10:30', icon: '🚌', title: 'Départ retour', desc: 'Embarquement et départ pour le campus.' },
      { time: '16:00', icon: '🏫', title: 'Arrivée sur le campus', desc: 'Fin officielle du voyage d\'études.' },
    ],
    img: 'https://images.unsplash.com/photo-1565799557186-8f5b0bb63ea4?w=500&q=80',
  },
]

function useIntersection(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function DayCard({ day, index }) {
  const ref = useRef(null)
  const visible = useIntersection(ref)
  const [open, setOpen] = useState(index === 0)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`bg-gradient-to-br ${day.bg} border ${day.border} rounded-3xl overflow-hidden`}>
        {/* Day header */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-4 p-6 hover:bg-white/3 transition"
        >
          {/* Image thumbnail */}
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
            <img src={day.img} alt={day.theme} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-br ${day.color} opacity-50`} />
            <span className="absolute inset-0 flex items-center justify-center text-2xl">{day.emoji}</span>
          </div>

          <div className="flex-1 text-left">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${day.color} bg-clip-text`}
                style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {day.day}
              </span>
            </div>
            <p className="text-white font-black text-xl">{day.date}</p>
            <p className="text-gray-400 text-sm">{day.theme}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-gray-500 bg-white/8 border border-white/10 px-3 py-1 rounded-full">
              {day.activities.length} étapes
            </span>
            <span className={`text-gray-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▼</span>
          </div>
        </button>

        {/* Activities timeline */}
        {open && (
          <div className="px-6 pb-6 animate-fade-up">
            <div className="border-t border-white/8 pt-5 space-y-0">
              {day.activities.map((act, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  {/* Time */}
                  <div className="text-xs font-mono text-gray-500 w-14 pt-2.5 shrink-0 tabular-nums">{act.time}</div>

                  {/* Timeline dot & line */}
                  <div className="flex flex-col items-center pt-2.5 shrink-0">
                    <div className={`w-2.5 h-2.5 rounded-full ${day.dot} ring-4 ring-white/10 shrink-0`} />
                    {i < day.activities.length - 1 && (
                      <div className="w-px flex-1 min-h-8 bg-white/8 mt-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-5 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{act.icon}</span>
                      <p className="text-white font-bold text-sm">{act.title}</p>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function PageProgramme({ setActiveTab }) {
  const headerRef = useRef(null)
  const headerVisible = useIntersection(headerRef)

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Header */}
      <div className="relative overflow-hidden pt-20 pb-16 px-4">
        <img
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
          alt="Forest"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/70 to-gray-950" />

        <div
          ref={headerRef}
          className={`relative z-10 text-center max-w-2xl mx-auto transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/35 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            14 – 17 Mai 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Programme du Voyage
          </h1>
          <p className="text-gray-400 text-base">
            4 jours d'expériences uniques · Kribi, Cameroun
          </p>
        </div>
      </div>

      {/* Quick overview */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DAYS.map((d, i) => (
            <div key={i} className={`bg-gradient-to-br ${d.bg} border ${d.border} rounded-2xl p-4 text-center`}>
              <span className="text-3xl block mb-2">{d.emoji}</span>
              <p className="text-white font-bold text-xs">{d.day}</p>
              <p className="text-gray-400 text-xs mt-0.5">{d.date.split(' ').slice(1).join(' ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Day cards */}
      <div className="max-w-5xl mx-auto px-4 pb-12 space-y-4">
        {DAYS.map((day, i) => (
          <DayCard key={day.day} day={day} index={i} />
        ))}

        {/* Note */}
        <div className="bg-gray-900 border border-amber-500/20 rounded-2xl p-6 flex gap-4">
          <span className="text-2xl shrink-0">📌</span>
          <div>
            <p className="text-amber-300 font-bold mb-1">Note importante</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Le programme peut être légèrement modifié en fonction des conditions météorologiques et des disponibilités sur place.
              L'encadrement est assuré par Odyssey × Sigma pour l'Université CDPE.
            </p>
          </div>
        </div>

        {/* CTA */}
        {setActiveTab && (
          <div className="gradient-animate rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-black text-white mb-3">Prêt à vivre l'aventure ?</h3>
            <p className="text-emerald-200 text-sm mb-6">Seulement 100 places disponibles · 60 000 FCFA</p>
            <button
              onClick={() => setActiveTab('inscription')}
              className="bg-white text-emerald-800 font-black px-8 py-4 rounded-2xl hover:bg-emerald-50 transition active:scale-95 shadow-xl"
            >
              ✍️ S'inscrire maintenant →
            </button>
          </div>
        )}
      </div>

      <footer className="text-center py-8 text-gray-700 text-xs border-t border-white/5">
        © 2026 — Odyssey × Sigma · Université CDPE · Kribi, Cameroun
      </footer>
    </div>
  )
}
