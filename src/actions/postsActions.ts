import {api} from '../api/api'
import {AppThunk} from '../app/store'
import {PostType} from '../reducers/postsReducer'

export const setPostsAC = (posts: Array<PostType>, currentPage: number, totalPagesCount: number) => ({type: 'SET-POSTS', posts, currentPage, totalPagesCount} as const)
export const setPostsBySearchAC = (posts: Array<PostType>) => ({type: 'SET-POSTS-BY-SEARCH', posts} as const)
export const addPostAC = (post: PostType) => ({type: 'ADD-POST', post} as const)
export const updatePostAC = (post: PostType) => ({type: 'UPDATE-POST', post} as const)
export const deletePostAC = (id: string) => ({type: 'DELETE-POST', id} as const)

type SetPostsActionType = ReturnType<typeof setPostsAC>;
type SetPostsBySearchActionType = ReturnType<typeof setPostsBySearchAC>;
type AddPostActionType = ReturnType<typeof addPostAC>;
type UpdatePostActionType = ReturnType<typeof updatePostAC>;
type DeletePostActionType = ReturnType<typeof deletePostAC>;

export type PostsActionsType = SetPostsActionType | AddPostActionType | UpdatePostActionType | DeletePostActionType | SetPostsBySearchActionType

export const getPostsTC = (page: number): AppThunk => {
    return async (dispatch) => {
        try {
            const {data, currentPage, totalPagesCount} = await api.getPosts(page)
            dispatch(setPostsAC(data, currentPage, totalPagesCount))
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
export const searchPostsTC = (searchQuery: SearchQueryType): AppThunk => {
    return async (dispatch) => {
        try {
            const {data} = await api.searchPosts(searchQuery)
            dispatch(setPostsBySearchAC(data))
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

export type SearchQueryType = {
    search: string
    tags: string
}