import "./Tabs.css";

const SECONDARY_TABS = [
  { id: "karaoke", label: "Karaoke" },
  { id: "media", label: "Galería" },
];

function Tabs({ isRegistered, onTicketsClick, onKaraokeClick, onMediaClick }) {
  const handlers = {
    karaoke: onKaraokeClick,
    media: onMediaClick,
  };
  const multimediaAvailableDate = new Date("2026-10-25T12:00:00+01:00");
  const now = new Date();

  const isMultimediaAvailable = now >= multimediaAvailableDate && isRegistered;

  return (
    <nav className="tabs-bar" aria-label="Secciones de HelenFest">
      <button
        type="button"
        className="tab tab-tickets"
        onClick={onTicketsClick}
      >
        🎟️ Comprar entradas
      </button>

      <button
        key={SECONDARY_TABS[0].id}
        type="button"
        className="tab"
        disabled={!isRegistered}
        onClick={handlers[SECONDARY_TABS[0].id]}
        title={
          !isRegistered
            ? "Consigue tu entrada para desbloquear esta sección"
            : undefined
        }
      >
        {SECONDARY_TABS[0].label}
      </button>
      <button
        key={SECONDARY_TABS[1].id}
        type="button"
        className="tab"
        disabled={!isMultimediaAvailable}
        onClick={handlers[SECONDARY_TABS[1].id]}
        title={
          !isRegistered
            ? "Consigue tu entrada para desbloquear esta sección"
            : now < multimediaAvailableDate
              ? "Esta sección estará disponible a partir del 25 de octubre de 2026 a las 12:00"
              : undefined
        }
      >
        {SECONDARY_TABS[1].label}
      </button>
    </nav>
  );
}

export default Tabs;
