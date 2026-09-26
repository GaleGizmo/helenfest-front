import { useState } from 'react'
import Modal from './Modal'

function RegisterModal({ onSubmit, onLoginClick }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [showCompanion, setShowCompanion] = useState(false)
  const [companionName, setCompanionName] = useState('')
  const [withMinor, setWithMinor] = useState(false)
  const [dish, setDish] = useState('')

  function handleToggleCompanion() {
    setShowCompanion((prev) => {
      if (prev) setCompanionName('')
      return !prev
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      email: email.trim(),
      name: name.trim(),
      companionName: showCompanion ? companionName.trim() : '',
      withMinor,
      dish: dish.trim(),
    })
  }

  return (
    <Modal>
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

        {showCompanion && (
          <label className="form-field">
            <span>Nombre de tu acompañante</span>
            <input
              type="text"
              required
              placeholder="Tu cómplice de fiesta"
              value={companionName}
              onChange={(event) => setCompanionName(event.target.value)}
            />
          </label>
        )}

        <button type="button" className="link-button toggle-companion" onClick={handleToggleCompanion}>
          {showCompanion ? 'Quitar acompañante' : 'Vengo acompañado/a (un email, dos entradas)'}
        </button>

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
          <span>Venimos con algún menor a bordo 🧒</span>
        </label>

        <label className="form-field">
          <span>Tu aportación culinaria 🍢 </span>
          <input
            type="text"
            placeholder="Ej: mi tortilla legendaria"
            value={dish}
            onChange={(event) => setDish(event.target.value)}
          />
          <small>El bar tiene un límite, tu generosidad no. Si no lo sabes aún, tranquilo.</small>
        </label>

        <button type="submit" className="btn-primary">
          ¡Reservar mi sitio en la pista!
        </button>
      </form>

      <p className="modal-alt-text">
        Ya estoy registrado, quiero{' '}
        <button type="button" className="link-button" onClick={onLoginClick}>
          entrar
        </button>
      </p>
    </Modal>
  )
}

export default RegisterModal
