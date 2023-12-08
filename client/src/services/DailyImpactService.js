import ApiService from './ApiService'

export async function apiGetDailyImpacts(data) {
  return ApiService.fetchData({
      url: '/daily-impacts',
      method: 'get',
      data
  })
}

export async function apiCreateNewDailyImpact(data) {
  return ApiService.fetchData({
      url: '/daily-impacts',
      method: 'post',
      data
  })
}

export async function apiGetMyDailyImpactToday(data) {
  return ApiService.fetchData({
      url: `/daily-impacts/today`,
      method: 'get',
      data,
  })
}
