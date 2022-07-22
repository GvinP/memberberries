import React, {useEffect} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import moment from "moment";
import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import useStyles from "./styles";
import {getPostTC, searchPostsTC} from "../../actions/postsActions";

const PostDetails = () => {
    const dispatch = useAppDispatch()
    const {post, posts, isLoading} = useAppSelector(state => state.posts)
    const navigate = useNavigate()
    const {id} = useParams()
    const classes = useStyles()

    useEffect(() => {
        dispatch(getPostTC(id!))
    }, [id])

    useEffect(() => {
        if (post.createdAt !== '') {
            dispatch(searchPostsTC({search: 'none', tags: post?.tags.join(',')}))
        }
    }, [post])

    const openPost = (id: string) => {
      navigate(`/posts/${id}`)
    }

    if (post.createdAt === '') return <></>

    if (isLoading) {
        return (
            <Paper className={classes.loadingPaper} elevation={6}>
                <CircularProgress size={'7em'}/>
            </Paper>
        )
    }

    const recommendedPosts = posts.filter(p => p._id !== post._id)

    return (
        <Paper style={{padding: '20px', borderRadius: '15px'}} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary"
                                component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.name}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{margin: '20px 0'}}/>
                    <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                    <Divider style={{margin: '20px 0'}}/>
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media}
                         src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                         alt={post.title}/>
                </div>
            </div>
            {recommendedPosts.length?(
                <div className={classes.section}>
                    <Typography gutterBottom variant={'h5'}>You might also like:</Typography>
                    <Divider/>
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.slice(0,4).map(p=>(
                            <div style={{margin: '20px', cursor: 'pointer'}} onClick={()=>openPost(p._id!)} key={p._id}>
                                <Typography gutterBottom variant={'h6'}>{p.title}</Typography>
                                <Typography gutterBottom variant={'subtitle2'}>{p.name}</Typography>
                                <Typography gutterBottom variant={'subtitle2'}>{p.message}</Typography>
                                <Typography gutterBottom variant={'subtitle1'}>Likes: {p.likes.length}</Typography>
                                <img src={p.selectedFile} alt={p.title} width={'200px'}/>
                            </div>
                        ))}
                    </div>
                </div>
            ): null}
        </Paper>
    );
};

export default PostDetails;