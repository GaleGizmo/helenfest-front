import request, { API_URL } from './client'

export const MAX_FILES = 5
export const MAX_IMAGE_MB = 15
export const MAX_VIDEO_MB = 150
export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm']
export const ACCEPT = [...IMAGE_TYPES, ...VIDEO_TYPES].join(',')

export const mediaUrl = (item) => `${API_URL}/uploads/${item.filename}`

export function fetchMedia() {
  return request('/api/media')
}

// XHR en lugar de fetch para poder mostrar el progreso de subida de vídeos pesados.
export function uploadMedia({ email, files, onProgress }) {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    form.append('email', email)
    files.forEach((file) => form.append('files', file))

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `${API_URL}/api/media`)

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100))
    }

    xhr.onload = () => {
      let data = null
      try {
        data = JSON.parse(xhr.responseText)
      } catch {
        data = null
      }
      if (xhr.status >= 200 && xhr.status < 300) return resolve(data)
      reject(new Error(data?.message || 'No se han podido subir los archivos.'))
    }

    xhr.onerror = () => reject(new Error('No se ha podido conectar con el servidor.'))
    xhr.send(form)
  })
}
