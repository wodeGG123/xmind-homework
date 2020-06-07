import r from '@/utils/request'
export function getBills() {
  return r({
    url: '/api/csv/bill',
    method: 'get'
  })
}
export function getCategories() {
  return r({
    url: '/api/csv/categories',
    method: 'get'
  })
}
