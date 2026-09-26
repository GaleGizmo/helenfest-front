import './Poster.css'

const LINEUP = [
  { name: 'Ramona y Albino', role: 'Actuación estelar', size: 'headliner' },
  { name: 'Plan B', role: 'Concierto', size: 'support' },
  { name: 'Micro Abierto', role: 'Participa tú', size: 'minor' },
  { name: 'Sesión Karaoke', role: 'Hasta el amanecer', size: 'minor' },
]

function Poster() {
  return (
    <section className="poster" aria-label="Cartel de HelenFest">
      <p className="poster-presents">
        La Comisión de Fiestas de HelenFest presenta:
      </p>

      <h1 className="poster-title">HELENFEST</h1>
      <p className="poster-subtitle">Grandes Fiestas Populares</p>

      <div className="poster-divider" aria-hidden="true">✦ ✦ ✦</div>

      <ol className="poster-lineup">
        {LINEUP.map((act) => (
          <li key={act.name} className={`poster-act poster-act--${act.size}`}>
            <span className="poster-act-name">{act.name}</span>
            <span className="poster-act-role">{act.role}</span>
          </li>
        ))}
      </ol>

      <div className="poster-divider" aria-hidden="true">✦ ✦ ✦</div>

      <p className="poster-footer">
        Entrada gratuita · Aforo limitado · No apto para aguafiestas
      </p>
    </section>
  )
}

export default Poster
