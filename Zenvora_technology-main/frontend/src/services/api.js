import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('zenvora_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('zenvora_token')
      localStorage.removeItem('zenvora_user')
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api

// ---------- Auth ----------
export const authApi = {
  registerStudent: (data) => api.post('/auth/register/student', data),
  registerProfessional: (data) => api.post('/auth/register/professional', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  changePassword: (data) => api.put('/auth/change-password', data),
  updatePhoto: (imageBase64) => api.put('/auth/profile-photo', { image_base64: imageBase64 }),
}

// ---------- Courses ----------
export const coursesApi = {
  list: (params) => api.get('/courses', { params }),
  get: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  toggleStatus: (id, newStatus) => api.patch(`/courses/${id}/status`, null, { params: { new_status: newStatus } }),
  remove: (id) => api.delete(`/courses/${id}`),
}

// ---------- Registrations ----------
export const registrationsApi = {
  create: (data) => api.post('/registrations', data),
  my: () => api.get('/registrations/my'),
  list: () => api.get('/registrations'),
  update: (id, data) => api.put(`/registrations/${id}`, data),
  cancel: (id) => api.delete(`/registrations/${id}`),
  submitPayment: (id) => api.post(`/registrations/${id}/submit-payment`),
  completeModule: (id, moduleNumber) => api.post(`/registrations/${id}/complete-module`, { module_number: moduleNumber }),
}

// ---------- Students ----------
export const studentsApi = {
  list: () => api.get('/students'),
  get: (id) => api.get(`/students/${id}`),
  updateProfile: (id, data) => api.put(`/students/${id}/profile`, data),
  setStatus: (id, newStatus) => api.patch(`/students/${id}/status`, null, { params: { new_status: newStatus } }),
  remove: (id) => api.delete(`/students/${id}`),
}

// ---------- Professionals ----------
export const professionalsApi = {
  list: () => api.get('/professionals'),
  get: (id) => api.get(`/professionals/${id}`),
  updateProfile: (id, data) => api.put(`/professionals/${id}/profile`, data),
  assignCourse: (id, courseId) => api.post(`/professionals/${id}/assign-course`, null, { params: { course_id: courseId } }),
  setStatus: (id, newStatus) => api.patch(`/professionals/${id}/status`, null, { params: { new_status: newStatus } }),
  remove: (id) => api.delete(`/professionals/${id}`),
}

// ---------- Batches ----------
export const batchesApi = {
  list: () => api.get('/batches'),
  create: (data) => api.post('/batches', data),
  update: (id, data) => api.put(`/batches/${id}`, data),
  remove: (id) => api.delete(`/batches/${id}`),
}

// ---------- Certificates ----------
export const certificatesApi = {
  my: () => api.get('/certificates/my'),
  list: () => api.get('/certificates'),
  issue: (data) => api.post('/certificates/issue', data),
  verify: (verificationId) => api.get(`/certificates/verify/${verificationId}`),
}

// ---------- Announcements ----------
export const announcementsApi = {
  list: () => api.get('/announcements'),
  create: (data) => api.post('/announcements', data),
  remove: (id) => api.delete(`/announcements/${id}`),
}

// ---------- Activity Logs ----------
export const activityApi = {
  my: () => api.get('/activity-logs/my'),
  list: (params) => api.get('/activity-logs', { params }),
}

// ---------- Analytics ----------
export const analyticsApi = {
  overview: () => api.get('/analytics/overview'),
  userGrowth: (days) => api.get('/analytics/user-growth', { params: { days } }),
  coursePopularity: () => api.get('/analytics/course-popularity'),
  registrationsByStatus: () => api.get('/analytics/registrations-by-status'),
}
