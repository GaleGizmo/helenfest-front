import './Poster.css'

const POSTER_ALT =
  'Cartel de HelenFest, 33 aniversario, 25 de octubre de 2026 en O Marquiño. ' +
  '12:00 apertura de puertas. 13:00 primer concierto del dúo Ramona y Albino, con la colaboración de Plan B. ' +
  '14:30 bingo musical. 16:00 karaoke. Adquiere ya tu entrada.'

function Poster() {
  return (
    <section className="poster" aria-label="Cartel de HelenFest">
      <img
        className="poster-image"
        src="/cartel_helenfest_produccion.jpg"
        alt={POSTER_ALT}
        width="1190"
        height="1682"
        fetchPriority="high"
      />
    </section>
  )
}

export default Poster
