import React from 'react'
import Post from './Post/Post'
import useStyles from './styles'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import {useAppSelector} from "../../app/hooks";

type PostsPropsType = {
    setCurrentId: (currentId: string) => void
}

const Posts = ({setCurrentId}: PostsPropsType) => {
    const classes = useStyles()
    const posts = useAppSelector(state => state.posts.posts)
    const isLoading = useAppSelector(state => state.posts.isLoading)

    if (!posts.length && !isLoading) return <div>'No posts'</div>

    return (
        isLoading
            ? <CircularProgress/> :
            <Grid container className={classes.mainContainer} alignItems={'stretch'} spacing={3}>
                {posts.map(post => (
                    <Grid item key={post._id} xs={12} sm={12} md={6} lg={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}
            </Grid>
    )
}

export default Posts