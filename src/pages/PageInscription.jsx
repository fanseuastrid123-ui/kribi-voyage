import { useState, useRef, useEffect } from 'react'

const ECOLE = ['KEYCE', 'DIGITAL COLLEGE', 'CDP']
const NIVEAUX = ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2', 'Doctorat']

function useIntersection(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) setVisible(true) 
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

export default function PageInscription({ onRegister, registrations, spotsLeft, total }) {
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', telephone: '', ecole: '', niveau: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [duplicate, setDuplicate] = useState(false)

  const filled = total - spotsLeft
  const pct = Math.round((filled / total) * 100)

  const headerRef = useRef(null)
  const formRef = useRef(null)
  const headerVisible = useIntersection(headerRef)
  const formVisible = useIntersection(formRef)

  const validate = () => {
    const e = {}
    if (!form.prenom.trim()) e.prenom = 'Prénom requis'
    if (!form.nom.trim()) e.nom = 'Nom requis'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email invalide'
    if (!form.telephone.trim() || !/^[0-9\s+]{8,15}$/.test(form.telephone)) e.telephone = 'Numéro invalide'
    if (!form.ecole) e.ecole = 'École requise'
    if (!form.niveau) e.niveau = 'Niveau requis'
    return e
  }

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
    setErrors((p) => ({ ...p, [e.target.name]: undefined }))
    setDuplicate(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    
    const dup = registrations.some(
      (r) => r.email.toLowerCase() === form.email.toLowerCase()
    )
    
    if (dup) { setDuplicate(true); return }
    
    onRegister(form)
    setSubmitted(true)
    setForm({ prenom: '', nom: '', email: '', telephone: '', ecole: '', niveau: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setSubmitted(false), 8000)
  }

  return (
    <div className="min-h-screen bg-gray-950">

      {/* ── HERO HEADER ── */}
      <div className="relative overflow-hidden gradient-animate pt-20 pb-16 px-4">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
          alt="Kribi beach"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950/80" />

        <div
          ref={headerRef}
          className={`relative z-10 text-center transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/35 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Inscription Officielle
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Réservez votre place
          </h1>
          <p className="text-emerald-300 text-base max-w-lg mx-auto font-medium">
            Voyage d'Études · Kribi, Cameroun · 14–17 Mai 2025
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── SIDEBAR ── */}
          <div className="space-y-5">
            <div className="bg-gray-900 border border-white/8 rounded-2xl p-6 text-center shadow-2xl">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">Places disponibles</p>
              <p className={`text-7xl font-black mb-1 ${spotsLeft <= 10 ? 'text-orange-400' : 'text-emerald-400'}`}>
                {spotsLeft}
              </p>
              <p className="text-gray-500 text-sm font-medium">sur {total} places</p>
              <div className="mt-4 bg-gray-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-1000 ${spotsLeft <= 10 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 font-medium">{filled} inscrits · {pct}% rempli</p>
            </div>

            <div className="bg-gray-900 border border-white/8 rounded-2xl p-5 space-y-3.5 shadow-xl">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Détails logistiques</p>
              {[
                { icon: '📍', label: 'Destination', value: 'Kribi, Cameroun' },
                { icon: '📅', label: 'Dates', value: '14 – 17 Mai 2025' },
                { icon: '💰', label: 'Coût', value: '60 000 FCFA', highlight: true },
                { icon: '🏛️', label: 'Organisateurs', value: 'Odyssey × Sigma' },
              ].map((d) => (
                <div key={d.label} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                  <span className="text-gray-500 text-xs flex items-center gap-1.5">{d.icon} {d.label}</span>
                  <span className={`text-xs font-semibold ${d.highlight ? 'text-emerald-400' : 'text-white'}`}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── FORMULAIRE ── */}
          <div ref={formRef} className={`lg:col-span-2 transition-all duration-700 delay-200 ${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>

            {submitted && (
              <div className="mb-6 bg-emerald-900/30 border border-emerald-500/35 rounded-2xl p-6 flex items-start gap-4 animate-fade-up">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-2xl shrink-0">🎉</div>
                <div>
                  <p className="font-black text-emerald-300 text-xl">Félicitations !</p>
                  <p className="text-emerald-400/80 text-sm mt-1 leading-relaxed font-medium">
                    Ton inscription est enregistrée. Passe au <strong>Bureau des Étudiants</strong> pour valider ton paiement.
                  </p>
                </div>
              </div>
            )}

            {duplicate && (
              <div className="mb-6 bg-yellow-900/25 border border-yellow-500/30 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <p className="text-yellow-300 text-sm font-medium">Cet email est déjà inscrit pour ce voyage.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="bg-gray-900 border border-white/8 rounded-3xl p-8 space-y-6 shadow-2xl">
              <div className="border-b border-white/8 pb-5">
                <h2 className="text-2xl font-black text-white">Informations Personnelles</h2>
                <p className="text-gray-400 text-sm mt-1">Remplis tes infos pour bloquer une place.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} error={errors.prenom} placeholder="Jean-Paul" />
                <Field label="Nom de famille" name="nom" value={form.nom} onChange={handleChange} error={errors.nom} placeholder="Mbarga" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="etudiant@ecole.cm" />
                <Field label="Téléphone" name="telephone" value={form.telephone} onChange={handleChange} error={errors.telephone} placeholder="6XX XXX XXX" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <SelectField label="École" name="ecole" value={form.ecole} onChange={handleChange} error={errors.ecole} options={ECOLE} />
                <SelectField label="Niveau" name="niveau" value={form.niveau} onChange={handleChange} error={errors.niveau} options={NIVEAUX} />
              </div>

              <button
                type="submit"
                className="w-full group bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-all text-white font-black py-5 rounded-2xl text-base shadow-xl shadow-emerald-500/20 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🚀 S'inscrire maintenant
                </span>
              </button>
            </form>

            {/* ── LISTE PUBLIQUE (SÉCURISÉE) ── */}
            {registrations.length > 0 && (
              <div className="mt-12 bg-gray-900 border border-white/8 rounded-3xl overflow-hidden shadow-xl animate-fade-up">
                <div className="px-6 py-5 border-b border-white/8 bg-white/2">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center text-sm font-black border border-emerald-500/30">
                      {registrations.length}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Inscriptions confirmées</h3>
                      <p className="text-[10px] text-gray-500">Liste publique — Seuls les noms sont visibles</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
                    {registrations.map((r, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-3 bg-gray-800/40 border border-white/5 p-4 rounded-xl hover:border-emerald-500/30 transition-all group"
                      >
                        <span className="text-[10px] font-mono text-gray-600 font-bold">{(i + 1).toString().padStart(2, '0')}</span>
                        <div className="flex flex-col">
                          <span className="text-white text-sm font-bold capitalize">
                            {r.prenom} {r.nom}
                          </span>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                            {r.ecole} • {r.niveau}
                          </span>
                        </div>
                        <div className="ml-auto shrink-0">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center py-8 text-gray-700 text-[10px] font-bold uppercase tracking-widest border-t border-white/5">
        © 2025 — Odyssey × Sigma · Université CDPE
      </footer>
    </div>
  )
}

// ── COMPOSANTS DE FORMULAIRE RÉUTILISABLES ──

function Field({ label, name, type = 'text', value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full bg-gray-800/50 border rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all ${
          error ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 focus:border-emerald-500 hover:border-white/10'
        }`}
      />
      {error && <p className="text-[10px] text-red-400 font-bold ml-1 uppercase">{error}</p>}
    </div>
  )
}

function SelectField({ label, name, value, onChange, error, options }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <select
        name={name} value={value} onChange={onChange}
        className={`w-full bg-gray-800/50 border rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all cursor-pointer ${
          error ? 'border-red-500/50 bg-red-500/5' : 'border-white/5 focus:border-emerald-500 hover:border-white/10'
        }`}
      >
        <option value="">Sélectionner</option>
        {options.map((o) => <option key={o} value={o} className="bg-gray-900">{o}</option>)}
      </select>
      {error && <p className="text-[10px] text-red-400 font-bold ml-1 uppercase">{error}</p>}
    </div>
  )
}