import r from '@/utils/request'
export async function getBills() {
  const rs = await r({
    url: '/api/csv/bill',
    method: 'get'
  })
  if (rs.code === 0) {
    return rs.data
  } else {
    return new Error(rs.message)
  }
}
export async function addBill(data) {
  const rs = await r({
    url: '/api/csv/bill',
    method: 'post',
    data
  })
  if (rs.code === 0) {
    return rs.data
  } else {
    return new Error(rs.message)
  }
}
export async function editBill(data) {
  const rs = await r({
    url: '/api/csv/bill',
    method: 'put',
    data
  })
  if (rs.code === 0) {
    return rs.data
  } else {
    return new Error(rs.message)
  }
}
export async function deleteBill(data) {
  const rs = await r({
    url: '/api/csv/bill',
    method: 'delete',
    data
  })
  if (rs.code === 0) {
    return rs.data
  } else {
    return new Error(rs.message)
  }
}
export async function getCategories() {
  const rs = await r({
    url: '/api/csv/categories',
    method: 'get'
  })
  if (rs.code === 0) {
    return rs.data
  } else {
    return new Error(rs.message)
  }
}
