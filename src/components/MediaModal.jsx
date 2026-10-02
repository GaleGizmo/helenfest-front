import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Modal from './Modal'
import './MediaModal.css'
import {
  ACCEPT,
  IMAGE_TYPES,
  MAX_FILES,
  MAX_IMAGE_MB,
  MAX_VIDEO_MB,
  VIDEO_TYPES,
  fetchMedia,
  mediaUrl,
  uploadMedia,
} from '../api/media'

const MB = 1024 * 1024

function validateFiles(files) {
  if (files.length > MAX_FILES) return `Máximo ${MAX_FILES} archivos por envío.`

  for (const file of files) {
    const isImage = IMAGE_TYPES.includes(file.type)
    const isVideo = VIDEO_TYPES.includes(file.type)

    if (!isImage && !isVideo) return `"${file.name}": formato no permitido (JPG, PNG, WebP, MP4, MOV o WebM).`
    if (isImage && file.size > MAX_IMAGE_MB * MB) return `"${file.name}": las fotos no pueden pasar de ${MAX_IMAGE_MB} MB.`
    if (isVideo && file.size > MAX_VIDEO_MB * MB) return `"${file.name}": los vídeos no pueden pasar de ${MAX_VIDEO_MB} MB.`
  }

  return ''
}

function formatSize(bytes) {
  return bytes >= MB ? `${(bytes / MB).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

function MediaModal({ guest, onClose }) {
  const inputRef = useRef(null)
  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState([])
  const [isLoadingGallery, setIsLoadingGallery] = useState(true)
  const [galleryError, setGalleryError] = useState('')

  async function loadGallery() {
    try {
      setItems(await fetchMedia())
      setGalleryError('')
    } catch (err) {
      setGalleryError(err.message)
    } finally {
      setIsLoadingGallery(false)
    }
  }

  useEffect(() => {
    loadGallery()
  }, [])

  function handleSelect(event) {
    const selected = Array.from(event.target.files)
    event.target.value = ''
    if (selected.length === 0) return

    const validationError = validateFiles(selected)
    setError(validationError)
    setFiles(validationError ? [] : selected)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (files.length === 0) return

    setError('')
    setProgress(0)
    setIsUploading(true)
    try {
      await uploadMedia({ email: guest.email, files, onProgress: setProgress })
      toast.success('¡Recuerdos subidos! La galería acaba de mejorar 📸')
      setFiles([])
      await loadGallery()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsUploading(false)
      setProgress(null)
    }
  }

  return (
    <Modal onClose={onClose} wide>
      <button type="button" className="modal-back" onClick={onClose}>
        ← Volver
      </button>
      <p className="modal-eyebrow">Pruebas del delito</p>
      <h2 className="modal-title">¡Fotos y vídeos!</h2>
      <p className="modal-text">
        Sube lo mejor (y lo peor) de la fiesta. Hasta {MAX_FILES} archivos por vez: fotos de
        hasta {MAX_IMAGE_MB} MB y vídeos de hasta {MAX_VIDEO_MB} MB.
      </p>

      <form className="modal-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          hidden
          onChange={handleSelect}
        />
        <button
          type="button"
          className="media-picker"
          disabled={isUploading}
          onClick={() => inputRef.current?.click()}
        >
          📷 Elegir fotos o vídeos
        </button>

        {files.length > 0 && (
          <ul className="media-selected">
            {files.map((file) => (
              <li key={`${file.name}-${file.size}`}>
                <span>{file.name}</span>
                <small>{formatSize(file.size)}</small>
              </li>
            ))}
          </ul>
        )}

        {isUploading && (
          <div className="media-progress" role="progressbar" aria-valuenow={progress ?? 0} aria-valuemin={0} aria-valuemax={100}>
            <div style={{ width: `${progress ?? 0}%` }} />
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={isUploading || files.length === 0}>
          {isUploading ? `Subiendo... ${progress ?? 0}%` : '¡Subir a la galería!'}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>

      <h3 className="media-gallery-title">Galería</h3>
      {isLoadingGallery && <p className="modal-text">Revelando fotos...</p>}
      {galleryError && <p className="form-error">{galleryError}</p>}
      {!isLoadingGallery && !galleryError && items.length === 0 && (
        <p className="modal-text">Todavía no hay nada. Sé el primero en romper el hielo.</p>
      )}
      <div className="media-gallery">
        {items.map((item) => (
          <figure key={item._id} className="media-item">
            {item.kind === 'video' ? (
              <video src={mediaUrl(item)} controls preload="metadata" playsInline />
            ) : (
              <img src={mediaUrl(item)} alt={`Foto de ${item.uploaderName}`} loading="lazy" />
            )}
            <figcaption>{item.uploaderName}</figcaption>
          </figure>
        ))}
      </div>
    </Modal>
  )
}

export default MediaModal
