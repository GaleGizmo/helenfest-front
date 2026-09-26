import './Modal.css'

function Modal({ children }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">{children}</div>
    </div>
  )
}

export default Modal
