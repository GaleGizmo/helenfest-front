import { useState } from 'react'
import toast from 'react-hot-toast'
import Modal from './Modal'
import { registerGuest } from '../api/guests'

function RegisterModal({ onSubmit, onLoginClick, onClose }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [companionName, setCompanionName] = useState('')
  const [withMinor, setWithMinor] = useState(false)
  const [minorName, setMinorName] = useState('')
  const [dish, setDish] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleToggleCompanion() {
    setShowCompanion((prev) => {
      if (prev) setCompanionName('')
      return !prev
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const guest = await registerGuest({
        email: email.trim(),
        name: name.trim(),
        hasChild: withMinor,
        minorName: withMinor ? minorName.trim() : undefined,
        dish: dish.trim() || undefined,
      })
      toast.success('¡Entrada reservada! Ya estás en la lista de la fiesta 🎉')
      onSubmit(guest)
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
      <p className="modal-eyebrow">Acreditación de festivalero</p>
      <h2 className="modal-title">¡Consigue tu pase!</h2>
      <p className="modal-text">
        Rellena esto y quedas oficialmente en la lista. Sin esto, en la puerta
        solo te dejamos entrar a mirar por la ventana.
      </p>

      <form className="modal-form register-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Tu nombre</span>
          <input
            type="text"
            required
            placeholder="¿Cómo te llaman en la pista de baile?"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className="form-field">
          <span>Email de contacto</span>
          <input
            type="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <small>Aquí llegará tu pase (y algún que otro cotilleo).</small>
        </label>

        <label className="form-checkbox">
          <input
            type="checkbox"
            checked={withMinor}
            onChange={(event) => setWithMinor(event.target.checked)}
          />
          <span>Vengo con sobri ❤️ </span>
        </label>
        {withMinor && (
          <label className="form-field">
            <span>Nombre sobri</span>
            <input
              type="text"
              required
              placeholder="Tu peque de confianza"
              value={minorName}
              onChange={(event) => setMinorName(event.target.value)}
            />
          </label>
        )}

        <label className="form-field">
          <span>Tu aportación culinaria 🍢 </span>
          <input
            type="text"
            required
            placeholder="Ej: mi tortilla legendaria"
            value={dish}
            onChange={(event) => setDish(event.target.value)}
          />
          <small>El bar tiene un límite, tu generosidad no.</small>
        </label>

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Reservando...' : '¡Reservar mi sitio en la pista!'}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>

      <p className="modal-alt-text">
        Ya tengo entrada, quiero{' '}
        <button type="button" className="link-button" onClick={onLoginClick}>
          acceder
        </button>
      </p>
    </Modal>
  )
}

export default RegisterModal
