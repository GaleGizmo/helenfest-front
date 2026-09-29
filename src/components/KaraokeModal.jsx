import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from './Modal'
import { submitKaraoke } from '../api/karaoke'

const emptySong = { title: '', link: '', duetWithHost: false }

function KaraokeModal({ guest, onSubmitted, onClose }) {
  const [singers, setSingers] = useState(guest?.name || '')
  const [songs, setSongs] = useState([{ ...emptySong }])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  function updateSong(index, field, value) {
    setSongs((prev) => prev.map((song, i) => (i === index ? { ...song, [field]: value } : song)))
  }

  function handleAddSong() {
    setSongs((prev) => (prev.length < 2 ? [...prev, { ...emptySong }] : prev))
  }

  function handleRemoveSong() {
    setSongs((prev) => prev.slice(0, 1))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const payload = {
        email: guest?.email,
        singers,
        songs: songs.map((song) => ({
          title: song.title.trim(),
          link: song.link.trim() || undefined,
          duetWithHost: song.duetWithHost,
        })),
      }
      const entry = await submitKaraoke(payload)
      toast.success('¡Canciones reservadas! Prepárate para brillar 🎤')
      onSubmitted(entry)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal onClose={onClose}>
      <button type="button" className="modal-back" onClick={onClose}>
        ← Volver
      </button>
      <p className="modal-eyebrow">Reserva tu momento de gloria</p>
      <h2 className="modal-title">¡A por el micro!</h2>
      <p className="modal-text">
        Vas a cantar, no hay marcha atrás. Elige hasta 2 canciones y deja el
        listón (o el ridículo) bien alto.
      </p>

      <form className="modal-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Cantante/s</span>
          <input
            type="text"
            required
            placeholder="Tu nombre (o los nombres de toda la panda)"
            value={singers}
            onChange={(event) => setSingers(event.target.value)}
          />
          <small>Si subís varios al escenario, sepáralos por comas.</small>
        </label>

        {songs.map((song, index) => (
          <fieldset className="song-fieldset" key={index}>
            <legend>Canción {index + 1}</legend>

            <label className="form-field">
              <span>Título y artista</span>
              <input
                type="text"
                required
                placeholder="Ej: Ramona y Albino - Su mayor éxito"
                value={song.title}
                onChange={(event) => updateSong(index, 'title', event.target.value)}
              />
            </label>

            <label className="form-field">
              <span>Enlace a la versión karaoke (opcional)</span>
              <input
                type="text"
                placeholder="https://..."
                value={song.link}
                onChange={(event) => updateSong(index, 'link', event.target.value)}
              />
              <small>Como sepas cuál es, todos te lo agradeceremos.</small>
            </label>

            <label className="form-checkbox">
              <input
                type="checkbox"
                checked={song.duetWithHost}
                onChange={(event) => updateSong(index, 'duetWithHost', event.target.checked)}
              />
              <span>Quiero que Helen suba a cantar conmigo 🎤👯</span>
            </label>
          </fieldset>
        ))}

        {songs.length < 2 ? (
          <button type="button" className="link-button toggle-companion" onClick={handleAddSong}>
            Añadir otra canción (para los ambiciosos)
          </button>
        ) : (
          <button type="button" className="link-button toggle-companion" onClick={handleRemoveSong}>
            Quitar segunda canción
          </button>
        )}

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Afinando...' : '¡Reservar mi turno en el micro!'}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </Modal>
  )
}

export default KaraokeModal
