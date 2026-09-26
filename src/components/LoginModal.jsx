import { useState } from 'react'
import Modal from './Modal'

function LoginModal({ onSubmit, onBack }) {
  const [email, setEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(email.trim())
  }

  return (
    <Modal>
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
        <button type="submit" className="btn-primary">
          Entrar
        </button>
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
