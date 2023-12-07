import ApiService from './ApiService'

export async function apiGetProfile(data) {
    return ApiService.fetchData({
        url: `/profile/${data.profileId}`,
        method: 'get',
        data,
    })
}
export async function apiGetProfileByUserId(data) {
    return ApiService.fetchData({
        url: `/profile/me`,
        method: 'get',
        data,
    })
}

export async function apiUpdateProfile(data) {
    return ApiService.fetchData({
        url: `/profile/me`,
        method: 'put',
        data,
    })
  }
  
export async function apiCreateProfile(data) {
    return ApiService.fetchData({
        url: `/profile`,
        Headers: {
            'Content-Type': 'multipart/form-data'
        },
        method: 'post',
        data,
    })
}

