import {PostsActionsType} from "../actions/postsActions";

export type PostType = {
    title: string
    message: string
    tags: Array<string>
    selectedFile: string
    name?: string
    author?: string
    _id?: string
    createdAt?: string
    likes: Array<string>
}

const initialState = [] as Array<PostType>


type InitialStateType = typeof initialState

export const postsReducer = (state: InitialStateType = initialState, action: PostsActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-POSTS':
            return [...action.posts]

        case 'ADD-POST':
            return [...state, action.post]

        case "UPDATE-POST":
            return state.map(post => post._id === action.post._id ? action.post : post)

        case "DELETE-POST":
            return state.filter(post => post._id !== action.id)

        default:
            return state
    }
}