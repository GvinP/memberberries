import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {postsReducer} from '../reducers/postsReducer'
import {authReducer} from "../reducers/authReducer";
import {PostsActionsType} from "../actions/postsActions";
import {AuthActionsType} from "../actions/authActions";

const rootReducer = combineReducers({
    posts: postsReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

type AppActionsType = PostsActionsType | AuthActionsType

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>