import {AuthActionsType} from "../actions/authActions";


export type AuthType = {
    _id: string;
    name: string;
    email: string;
    password: string;
    image: string
}

const initialState: AuthDataType = {
    authData: null,
    token: ''
}


export type AuthDataType = {
    authData: AuthType | null
    token: string
}

export const authReducer = (state: AuthDataType = initialState, action: AuthActionsType): AuthDataType => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('profile', JSON.stringify({authData: action.authData.result, token: action.authData.token}))
            return {...state, authData: action.authData.result, token: action.authData.token}

        case "LOGOUT":
            localStorage.removeItem('profile')
            return {...state, authData: null}

        default:
            return state
    }
}