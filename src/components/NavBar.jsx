import { useState, useEffect } from 'react'

const TABS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'programme', label: 'Programme' },
  { id: 'inscription', label: 'Inscription' },
  { id: 'contact', label: 'Contact' },
]

export default function NavBar({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-blur shadow-2xl shadow-black/40 border-b border-white/8' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => setActiveTab('accueil')} className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/40 group-hover:bg-emerald-500/30 transition-all">
            <span className="text-xl animate-wave inline-block">🌴</span>
          </div>
          <div className="text-left">
            <p className="text-sm font-black text-white leading-none tracking-wide uppercase">
              <span className="text-emerald-400">Odyssey</span> × <span className="text-teal-400">Sigma</span>
            </p>
            <p className="text-xs text-gray-400 font-medium">Kribi 2025 · CDPE</p>
          </div>
        </button>

        {/* Desktop tabs */}
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-2xl p-1 gap-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-white/8'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CTA button */}
        <div className="hidden md:block">
          <button
            onClick={() => setActiveTab('inscription')}
            className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition-all text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-emerald-500/30 animate-pulse-glow"
          >
            S'inscrire →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden nav-blur border-t border-white/10 px-4 py-4 space-y-2 animate-slide-down">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMenuOpen(false) }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={() => { setActiveTab('inscription'); setMenuOpen(false) }}
            className="w-full bg-emerald-500 hover:bg-emerald-400 transition text-white font-bold px-4 py-3 rounded-xl text-sm mt-2"
          >
            S'inscrire maintenant →
          </button>
        </div>
      )}
    </nav>
  )
}
