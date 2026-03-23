import { useState, useRef, useEffect } from 'react'

function useIntersection(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

const FAQ = [
  {
    q: 'Quand et comment payer ?',
    a: 'Le paiement de 60 000 FCFA est dû dans les 5 jours suivant votre inscription en ligne, directement au Bureau des Étudiants.',
  },
  {
    q: 'Peut-on s\'inscrire par groupe ?',
    a: 'Oui, mais chaque étudiant doit remplir son propre formulaire d\'inscription individuellement.',
  },
  {
    q: 'Y a-t-il une liste d\'attente ?',
    a: 'En cas de complet, vous pouvez contacter le Bureau des Étudiants pour figurer sur la liste d\'attente.',
  },
  {
    q: 'Le voyage est-il obligatoire ?',
    a: 'Non, c\'est un voyage facultatif mais vivement recommandé pour son volet culturel et académique.',
  },
  {
    q: 'Que faire en cas d\'annulation ?',
    a: 'Contactez le Bureau des Étudiants au plus tôt. Les modalités de remboursement seront définies au cas par cas.',
  },
]

export default function PageContact() {
  const [openFaq, setOpenFaq] = useState(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const headerVisible = useIntersection(headerRef)
  const contentVisible = useIntersection(contentRef)

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Header */}
      <div className="relative overflow-hidden pt-20 pb-16 px-4">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
          alt="Kribi"
          className="absolute inset-0 w-full h-full object-cover opacity-12"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-gray-950" />
        <div
          ref={headerRef}
          className={`relative z-10 text-center transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/35 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Bureau des Étudiants
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Contactez-nous
          </h1>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            Des questions sur le voyage ? L'équipe Odyssey × Sigma est là pour vous aider.
          </p>
        </div>
      </div>

      <div
        ref={contentRef}
        className={`max-w-6xl mx-auto px-4 py-8 pb-16 transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── LEFT — Contact info ── */}
          <div className="space-y-5">

            {/* Organisateurs */}
            <div className="bg-gradient-to-br from-emerald-900/25 to-teal-900/10 border border-emerald-500/25 rounded-3xl p-7">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-2xl">
                  🏛️
                </div>
                <div>
                  <p className="text-white font-black text-lg">Odyssey × Sigma</p>
                  <p className="text-gray-400 text-sm">Organisateurs officiels · Université CDPE</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ce voyage est organisé par les associations <strong className="text-emerald-300">Odyssey</strong> et <strong className="text-teal-300">Sigma</strong> pour les étudiants de l'Université CDPE. Pour toute question, contactez directement le Bureau des Étudiants.
              </p>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 gap-4">

              {/* Bureau */}
              <div className="bg-gray-900 border border-white/8 rounded-2xl p-5 flex gap-4 card-hover">
                <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/25 rounded-xl flex items-center justify-center text-xl shrink-0">
                  🏫
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-1">Bureau des Étudiants</p>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Bâtiment A — Rez-de-chaussée<br />
                    Ouvert Lun – Ven · 08h00 – 16h00
                  </p>
                </div>
              </div>

              {/* Phone 1 */}
              <a href="tel:+237694881471" className="bg-gray-900 border border-white/8 rounded-2xl p-5 flex gap-4 card-hover group cursor-pointer block">
                <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/25 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-emerald-500/30 transition">
                  📞
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1 uppercase tracking-widest font-semibold">Téléphone 1</p>
                  <p className="text-white font-bold text-lg group-hover:text-emerald-400 transition">694 881 471</p>
                  <p className="text-gray-500 text-xs">Appuyer pour appeler</p>
                </div>
              </a>

              {/* Phone 2 */}
              <a href="tel:+237683916631" className="bg-gray-900 border border-white/8 rounded-2xl p-5 flex gap-4 card-hover group cursor-pointer block">
                <div className="w-10 h-10 bg-teal-500/20 border border-teal-500/25 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-teal-500/30 transition">
                  📞
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1 uppercase tracking-widest font-semibold">Téléphone 2</p>
                  <p className="text-white font-bold text-lg group-hover:text-teal-400 transition">683 916 631</p>
                  <p className="text-gray-500 text-xs">Appuyer pour appeler</p>
                </div>
              </a>

            </div>

            {/* Info box */}
            <div className="bg-gray-900/60 border border-amber-500/20 rounded-2xl p-5 flex gap-3">
              <span className="text-xl shrink-0">⏰</span>
              <p className="text-gray-400 text-sm leading-relaxed">
                <strong className="text-amber-300">Horaires de disponibilité :</strong> Lundi au Vendredi de 08h00 à 16h00. Hors de ces heures, vous pouvez laisser un message et nous vous rappellerons dès que possible.
              </p>
            </div>
          </div>

          {/* ── RIGHT — FAQ ── */}
          <div className="space-y-5">

            {/* Recap box */}
            <div className="gradient-animate rounded-3xl p-7 text-center relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-white font-black text-2xl mb-1">Voyage Kribi 2026</p>
                <p className="text-emerald-200 text-sm mb-5">Organisé par Odyssey × Sigma · Université CDPE</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: '📅', val: '14–17 Mai', lbl: 'Dates' },
                    { icon: '💰', val: '60K FCFA', lbl: 'Tarif' },
                    { icon: '👥', val: '100 places', lbl: 'Capacité' },
                  ].map((s) => (
                    <div key={s.lbl} className="bg-white/10 backdrop-blur rounded-xl p-3">
                      <span className="text-xl block mb-1">{s.icon}</span>
                      <p className="text-white font-black text-sm">{s.val}</p>
                      <p className="text-emerald-200/70 text-xs">{s.lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gray-900 border border-white/8 rounded-3xl p-6">
              <h3 className="text-white font-black text-lg mb-5">Questions fréquentes</h3>
              <div className="space-y-2">
                {FAQ.map((item, i) => (
                  <div key={i} className={`border rounded-xl overflow-hidden transition-all duration-300 ${openFaq === i ? 'border-emerald-500/30 bg-emerald-900/10' : 'border-white/8 bg-transparent hover:border-white/15'}`}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                    >
                      <span className="text-sm font-semibold text-white pr-3">{item.q}</span>
                      <span className={`text-gray-500 text-xs shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-emerald-400' : ''}`}>▼</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 animate-fade-up">
                        <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-900 border border-white/8 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1565799557186-8f5b0bb63ea4?w=700&q=80"
                alt="Kribi, Cameroun"
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex items-center gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="text-white font-bold text-sm">Kribi, Région Sud</p>
                  <p className="text-gray-400 text-xs">Cameroun · Océan Atlantique</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center py-8 text-gray-700 text-xs border-t border-white/5">
        © 2026 — Odyssey × Sigma · Université CDPE · Voyage Kribi
      </footer>
    </div>
  )
}
