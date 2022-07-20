import {api} from '../api/api'
import {AppThunk} from '../app/store'
import {PostType} from '../reducers/postsReducer'

export const setPostsAC = (posts: Array<PostType>) => ({type: 'SET-POSTS', posts} as const)
export const addPostAC = (post: PostType) => ({type: 'ADD-POST', post} as const)
export const updatePostAC = (post: PostType) => ({type: 'UPDATE-POST', post} as const)
export const deletePostAC = (id: string) => ({type: 'DELETE-POST', id} as const)

type SetPostsActionType = ReturnType<typeof setPostsAC>;
type AddPostActionType = ReturnType<typeof addPostAC>;
type UpdatePostActionType = ReturnType<typeof updatePostAC>;
type DeletePostActionType = ReturnType<typeof deletePostAC>;

export type PostsActionsType = SetPostsActionType | AddPostActionType | UpdatePostActionType | DeletePostActionType

export const getPostsTC = (): AppThunk => {
    return async (dispatch) => {
        try {
            const {data} = await api.getPosts()
            dispatch(setPostsAC(data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const addPostTC = (post: PostType): AppThunk => {
    return async (dispatch) => {
        try {
            const {data} = await api.addPost(post)
            dispatch(addPostAC(data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const updatePostTC = (id: string, post: PostType): AppThunk => {
    return async (dispatch) => {
        try {
            const {data} = await api.updatePost(id, post)
            dispatch(updatePostAC(data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deletePostTC = (id: string): AppThunk => {
    return async (dispatch) => {
        try {
            await api.deletePost(id)
            dispatch(deletePostAC(id))
        } catch (e) {
            console.log(e)
        }
    }
}

export const likePostTC = (id: string): AppThunk => {
    return async (dispatch) => {
        try {
            const {data} = await api.likePost(id)
            dispatch(updatePostAC(data))
        } catch (e) {
            console.log(e)
        }
    }
}