import { useEffect, useState } from 'react'
import './App.css'
import BackgroundMobile from './assets/helenfest_background_mobile.jpg'
import BackgroundDesktop from './assets/helenfest_background_desktop.jpg'
import Tabs from './components/Tabs'
import Poster from './components/Poster'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
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

  return (
    <main className="app-shell">
      <picture>
        <source media="(min-width: 768px)" srcSet={BackgroundDesktop} />
        <img src={BackgroundMobile} alt="" className="app-background" />
      </picture>

      <Tabs isRegistered={Boolean(session)} onTicketsClick={handleTicketsClick} />
      <Poster />

      {activeModal === 'register' && (
        <RegisterModal onSubmit={handleAuthSuccess} onLoginClick={() => setActiveModal('login')} />
      )}
      {activeModal === 'login' && (
        <LoginModal onSubmit={handleAuthSuccess} onBack={() => setActiveModal('register')} />
      )}
    </main>
  )
}

export default App
