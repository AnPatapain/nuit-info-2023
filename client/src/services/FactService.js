import ApiService from './ApiService'

export async function apiGetDailyFacts(data) {
    return ApiService.fetchData({
        url: '/dailyFact/all',
        method: 'get',
        data,
    })
}

export async function apiCreateNewDailyFact(data) {
  return ApiService.fetchData({
      url: '/dailyFact/',
      method: 'post',
      data,
  })
}

export async function apiChangeVote(data) {
  return ApiService.fetchData({
      url: `/dailyFact/${data.dailyFactId}`,
      method: 'post',
      data,
  })
}

