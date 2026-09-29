import './Modal.css'

function Modal({ children, onClose }) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose?.()
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className="modal-card">{children}</div>
    </div>
  )
}

export default Modal
