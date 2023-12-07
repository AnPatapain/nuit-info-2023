import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetProfileByUserId } from "services/ProfileService";


export const getProfile = createAsyncThunk(
    'profile/data/getProfile',
    async () => {
        const response = await apiGetProfileByUserId()
        console.log(response.data);
        return response.data
    }
)

export const initialStateProfile = {
    "email": "",
    "image": "",
    "name": "",
    "github": "",
    "techSkills": [],
    "projects": [],
    "notificationSend": [],
    "notificationReceived": [],
    _id: "",
    __v: 0,
}

export const profileSlice = createSlice({
    name: 'profile/data',
    initialState: initialStateProfile,
    reducers: {
        setProfile: (_, action) => action.payload,
    },
    extraReducers: {
        [getProfile.fulfilled]: (_, action) => action.payload.profile,

    },
})

export const { setProfile } = profileSlice.actions

export default profileSlice.reducer
