import { combineReducers } from 'redux'
import theme from './theme/themeSlice'
import auth from './auth'
import base from './base'
import locale from './locale/localeSlice'
import profile from './profile/profileSlice'
const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        base,
        locale,
        profile,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}

export default rootReducer
