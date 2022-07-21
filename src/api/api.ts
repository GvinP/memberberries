import axios from 'axios'
import {PostType} from "../reducers/postsReducer";
import {FormDataType} from "../components/Login/Login";
import {SearchQueryType} from "../actions/postsActions";

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
})

instance.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        //@ts-ignore
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const api = {
    getPosts(page: number) {
        return instance.get<any, any>(`posts?page=${page}`).then(res=>res.data);
    },
    getPost(id: string) {
        return instance.get(`posts/${id}`)
    },
    addPost(post: PostType) {
        return instance.post('posts', post)
    },
    updatePost(id: string, post: PostType) {
        return instance.patch(`posts/${id}`, post)
    },
    deletePost(id: string) {
        return instance.delete(`posts/${id}`)
    },
    likePost(id: string) {
        return instance.patch(`posts/${id}/like`)
    },
    searchPosts(searchQuery: SearchQueryType) {
        return instance.get(`posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
    },
}

export type GoogleAuthType = {
    name: string
    picture: string
    sub: string
}

export const authApi = {
    registration(formData: FormDataType) {
        return instance.post('user/registration', formData)
    },
    login(formData: FormDataType) {
        return instance.post('user/login', formData)
    }
}