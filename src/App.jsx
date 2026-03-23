import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient' // Import de la connexion
import NavBar from './components/NavBar'
import PageAccueil from './pages/PageAccueil'
import PageInscription from './pages/PageInscription'
import PageProgramme from './pages/PageProgramme'
import PageContact from './pages/PageContact'
import './index.css'

const TOTAL_SPOTS = 100

export default function App() {
  const [activeTab, setActiveTab] = useState('accueil')
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)

  // ── 1. CHARGEMENT DES DONNÉES DEPUIS SUPABASE ──
  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const { data, error } = await supabase
          .from('inscriptions')
          .select('*')
          .order('created_at', { ascending: true })
        
        if (error) throw error
        if (data) setRegistrations(data)
      } catch (err) {
        console.error("Erreur de chargement:", err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchRegistrations()
  }, [])

  // ── 2. FONCTION D'INSCRIPTION (SAUVEGARDE RÉELLE) ──
  const handleRegister = async (student) => {
    try {
      const { data, error } = await supabase
        .from('inscriptions')
        .insert([student])
        .select()

      if (error) throw error
      
      if (data) {
        setRegistrations((prev) => [...prev, data[0]])
      }
    } catch (err) {
      alert("Erreur base de données : " + err.message)
    }
  }

  const spotsLeft = TOTAL_SPOTS - registrations.length

  // On évite le flash blanc pendant le chargement
  if (loading) return null 

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'accueil' && (
        <PageAccueil setActiveTab={setActiveTab} spotsLeft={spotsLeft} total={TOTAL_SPOTS} />
      )}
      
      {activeTab === 'inscription' && (
        <PageInscription
          onRegister={handleRegister}
          registrations={registrations}
          spotsLeft={spotsLeft}
          total={TOTAL_SPOTS}
        />
      )}

      {activeTab === 'programme' && <PageProgramme setActiveTab={setActiveTab} />}
      
      {activeTab === 'contact' && <PageContact />}
    </div>
  )
}