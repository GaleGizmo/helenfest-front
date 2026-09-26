import './Tabs.css'

const SECONDARY_TABS = [
  { id: 'karaoke', label: 'Karaoke' },
  { id: 'open-mic', label: 'Micro Abierto' },
]

function Tabs({ isRegistered, onTicketsClick }) {
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
          title={!isRegistered ? 'Consigue tu entrada para desbloquear esta sección' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

export default Tabs
