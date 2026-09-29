import { useEffect, useState } from 'react'
import './App.css'
import BackgroundMobile from './assets/helenfest_background_mobile.jpg'
import BackgroundDesktop from './assets/helenfest_background_desktop.jpg'
import Tabs from './components/Tabs'
import Poster from './components/Poster'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import KaraokeModal from './components/KaraokeModal'
import { getSession, saveSession } from './hooks/useSession'

function App() {
  const [session, setSession] = useState(null)
  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    setSession(getSession())
  }, [])

  function handleAuthSuccess(guest) {
    saveSession(guest)
    setSession(guest)
    setActiveModal(null)
  }

  function handleTicketsClick() {
    if (!session) {
      setActiveModal('register')
    }
  }

  function handleKaraokeClick() {
    if (session) {
      setActiveModal('karaoke')
    }
  }

  return (
    <main className="app-shell">
      <picture>
        <source media="(min-width: 768px)" srcSet={BackgroundDesktop} />
        <img src={BackgroundMobile} alt="" className="app-background" />
      </picture>

      <Tabs isRegistered={Boolean(session)} onTicketsClick={handleTicketsClick} onKaraokeClick={handleKaraokeClick} />
      <Poster />

      {activeModal === 'register' && (
        <RegisterModal
          onSubmit={handleAuthSuccess}
          onLoginClick={() => setActiveModal('login')}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'login' && (
        <LoginModal onSubmit={handleAuthSuccess} onBack={() => setActiveModal('register')} />
      )}
      {activeModal === 'karaoke' && (
        <KaraokeModal
          guest={session}
          onSubmitted={() => setActiveModal(null)}
          onClose={() => setActiveModal(null)}
        />
      )}
    </main>
  )
}

export default App
