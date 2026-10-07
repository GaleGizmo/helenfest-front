import Modal from "./Modal";


export default function SoldOutModal({ onClose }) {
  return (
    <Modal onClose={onClose} modalClass="soldout">
      <div className="soldau_img_container">
        <img className="soldau_img" src="/soldau.png" alt="Entradas agotadas" />
        <p className="por_ahora">(POR AHORA)</p>
        
      </div>
      <p className="soldout-text">Las fechas límite se ponen para algo, esto es un festi serio.</p>
    </Modal>
  );
}
