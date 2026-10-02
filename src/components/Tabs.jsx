import './Tabs.css'

const SECONDARY_TABS = [
  { id: 'karaoke', label: 'Karaoke' },
  { id: 'media', label: 'Multimedia' },
]

function Tabs({ isRegistered, onTicketsClick, onKaraokeClick, onMediaClick }) {
  const handlers = {
    karaoke: onKaraokeClick,
    media: onMediaClick,
  }

  return (
    <nav className="tabs-bar" aria-label="Secciones de HelenFest">
      <button type="button" className="tab tab-tickets" onClick={onTicketsClick}>
        🎟️ Comprar entradas
      </button>
      {SECONDARY_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className="tab"
          disabled={!isRegistered}
          onClick={handlers[tab.id]}
          title={!isRegistered ? 'Consigue tu entrada para desbloquear esta sección' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

export default Tabs
