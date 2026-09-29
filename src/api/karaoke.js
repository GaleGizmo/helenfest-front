import request from './client'

export function submitKaraoke(payload) {
  return request('/api/karaoke', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
