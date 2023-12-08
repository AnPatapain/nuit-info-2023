import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import { setProfile, initialStateProfile } from 'store/profile/profileSlice'
import { apiSignIn, apiSignUp } from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { apiGetProfile,apiGetProfileByUserId } from 'services/ProfileService'

function useAuth() {
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useSelector((state) => state.auth.session)

    const signIn = async (values) => {
        try {
            const resp = await apiSignIn(values)
            
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))

                if (resp.data) {
                    dispatch(
                        setUser(
                            resp.data || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                // TODO: handle if profile is not created
                try {
                    const res = await apiGetProfileByUserId()
                    if (res.data) {
                        dispatch(setProfile(res.data.profile))
                    }    
                } catch (error) {
                    navigate('/profile')  
                }
                
                navigate(
                    appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        dispatch(setProfile(initialStateProfile))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
