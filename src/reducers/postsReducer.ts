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

const initialState = {
    currentPage: 1,
    totalCountOfPages: 3,
    posts: [] as Array<PostType>,
}


type InitialStateType = typeof initialState

export const postsReducer = (state: InitialStateType = initialState, action: PostsActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-POSTS':
            return {...state, posts: [...action.posts], currentPage: action.currentPage, totalCountOfPages: action.totalPagesCount}

        case 'SET-POSTS-BY-SEARCH':
            return {...state, posts: [...action.posts]}

        case 'ADD-POST':
            return {...state, posts: [...state.posts, action.post]}

        case "UPDATE-POST":
            return {...state, posts: state.posts.map(post => post._id === action.post._id ? action.post : post)}
            // return state.map(post => post._id === action.post._id ? action.post : post)

        case "DELETE-POST":
            return {...state, posts: state.posts.filter(post => post._id !== action.id)}
            // return state.filter(post => post._id !== action.id)

        default:
            return state
    }
}