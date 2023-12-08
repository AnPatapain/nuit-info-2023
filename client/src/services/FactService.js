import ApiService from './ApiService'

export async function apiGetDailyDailyFacts(data) {
    return ApiService.fetchData({
        url: '/daily-facts',
        method: 'get',
        data,
    })
}

export async function apiCreateNewDailyFact(data) {
  return ApiService.fetchData({
      url: '/daily-facts',
      method: 'post',
      data,
  })
}

export async function apiGetDailyFactById(data) {
  return ApiService.fetchData({
      url: `/daily-facts/${data.dailyFactId}`,
      method: 'get',
      data,
  })
}

export async function apiUpdateDailyFactById(data) {
  return ApiService.fetchData({
      url: `/daily-facts/${data.dailyFactId}`,
      method: 'put',
      data,
  })
}
export async function apiDeleteDailyFactById(data) {
  return ApiService.fetchData({
      url: `/daily-facts/${data.dailyFactId}`,
      method: 'delete',
      data,
  })
}
export async function apiJoinToDailyFact(data) {
  return ApiService.fetchData({
      url: `/daily-facts/join/${data.dailyFactId}`,
      method: 'post',
      data,
  })
}