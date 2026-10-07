import './Modal.css'

function Modal({ children, onClose, wide = false, modalClass }) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose?.()
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className={`modal-card${wide ? ' modal-card--wide' : ''}${modalClass ? ` ${modalClass}` : ''}`}>{children}</div>
    </div>
  )
}

export default Modal
