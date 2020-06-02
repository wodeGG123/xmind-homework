import r from '@/utils/request'
export function getBills() {
  return r({
    url: '/api/csv/bill',
    method: 'get'
  })
}
