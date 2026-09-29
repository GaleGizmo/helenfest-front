import { useState } from 'react'
import Modal from './Modal'
import { findGuestByEmail } from '../api/guests'

function LoginModal({ onSubmit, onBack }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const guest = await findGuestByEmail(email.trim())
      onSubmit(guest)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal onClose={onBack}>
      <p className="modal-eyebrow">Bienvenido de nuevo</p>
      <h2 className="modal-title">Inicia sesión</h2>
      <p className="modal-text">
        Introduce el email con el que te registraste para entrar.
      </p>
      <form className="modal-form" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Comprobando...' : 'Entrar'}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
      <p className="modal-alt-text">
        <button type="button" className="link-button" onClick={onBack}>
          Volver
        </button>
      </p>
    </Modal>
  )
}

export default LoginModal
