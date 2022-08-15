import {authApi} from '../api/api'
import {AppThunk} from '../app/store'
import {FormDataType} from "../components/Login/Login";
import {NavigateFunction} from "react-router-dom";


export const loginAC = (authData: any) => ({type: 'LOGIN', authData} as const)
export const logoutAC = () => ({type: 'LOGOUT'} as const)

type LoginActionType = ReturnType<typeof loginAC>;
type LogoutActionType = ReturnType<typeof logoutAC>;

export type AuthActionsType = LoginActionType | LogoutActionType
export const loginTC = (formData: FormDataType, navigate: NavigateFunction): AppThunk => {
    return async (dispatch) => {
        try {
            const {data} = await authApi.login(formData)
            dispatch(loginAC(data))
            localStorage.setItem('profile', JSON.stringify({authData: data.result, token: data.token}))
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }
}
export const registrationTC = (formData: FormDataType, navigate: NavigateFunction): AppThunk => {
    return async (dispatch) => {
        try {
            const {data} = await authApi.registration(formData)
            dispatch(loginAC(data))
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }
}

