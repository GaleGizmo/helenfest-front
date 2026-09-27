import request from './client'

export function registerGuest(payload) {
  return request('/api/guests', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function findGuestByEmail(email) {
  return request(`/api/guests/${encodeURIComponent(email)}`)
}
