import { useEffect, useState } from 'react'
import SoldOutModal from './components/SoldOutModal'
import toast, { Toaster } from 'react-hot-toast'
import './App.css'
import BackgroundMobile from './assets/helenfest_background_mobile.jpg'
import BackgroundDesktop from './assets/helenfest_background_desktop.jpg'
import Tabs from './components/Tabs'
import Poster from './components/Poster'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import KaraokeModal from './components/KaraokeModal'
import MediaModal from './components/MediaModal'
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
      // setActiveModal('register')
      setActiveModal('soldout')
    } else {
      toast.error("¡Ya tienes entrada! ¿¿Cuantas más quieres??")
    }
  }

  function handleKaraokeClick() {
    if (session) {
      setActiveModal('karaoke')
    }
  }

  function handleMediaClick() {
    if (session) {
      setActiveModal('media')
    }
  }

  return (
    <main className="app-shell">
      <picture>
        <source media="(min-width: 768px)" srcSet={BackgroundDesktop} />
        <img src={BackgroundMobile} alt="" className="app-background" />
      </picture>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(180deg, rgba(27, 22, 58, 0.96) 0%, rgba(15, 12, 35, 0.98) 100%)',
            color: '#fdf6ec',
            border: '1px solid rgba(242, 177, 52, 0.35)',
            borderRadius: '14px',
            fontSize: '0.9rem',
          },
          success: { iconTheme: { primary: '#f2b134', secondary: '#1b1633' } },
        }}
      />

      <Tabs
        isRegistered={Boolean(session)}
        onTicketsClick={handleTicketsClick}
        onKaraokeClick={handleKaraokeClick}
        onMediaClick={handleMediaClick}
      />
      {!activeModal && <Poster />}

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
      {activeModal === 'soldout' && (
        <SoldOutModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'media' && (
        <MediaModal guest={session} onClose={() => setActiveModal(null)} />
      )}
    </main>
  )
}

export default App
