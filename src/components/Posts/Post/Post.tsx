import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import Delete from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import useStyles from './styles'
import {PostType} from "../../../reducers/postsReducer";
import moment from "moment";
import {useAppDispatch} from "../../../app/hooks";
import {deletePostTC, likePostTC} from "../../../actions/postsActions";
import {useNavigate} from "react-router-dom";

type PostPostType = {
    post: PostType
    setCurrentId: (currentId: string) => void
}

const Post = ({post, setCurrentId}: PostPostType) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('profile'))

    const openCard = () => navigate(`/posts/${post._id}`)

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === user?.authData?._id)
                ? (
                    <><ThumbUpAlt
                        fontSize={'small'}/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`} </>
                ) : (
                    <><ThumbUpAltOutlined
                        fontSize={'small'}/>&nbsp;{post.likes.length}&nbsp;{post.likes.length === 1 ? 'Like' : 'Likes'}</>
                )
        }
        return <><ThumbUpAltOutlined fontSize={'small'}/>&nbsp; Like </>
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase className={classes.cardAction} onClick={openCard}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant={'h6'}>{post.name}</Typography>
                    <Typography variant={'body2'}>{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div className={classes.details}>
                    <Typography variant={'body2'}
                                color={'textSecondary'}>{post.tags.map(tag => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant={'h5'} gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant={'body2'} color={'textSecondary'} component={'p'}>{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button color={'primary'} size={'small'} disabled={!user?.authData}
                        onClick={() => dispatch(likePostTC(post._id!))}>
                    <Likes/>
                </Button>
                {(user?.authData?._id === post.author) && (
                    <Button color={'secondary'} size={'small'} onClick={() => dispatch(deletePostTC(post._id!))}>
                        <Delete fontSize={'small'}/>
                        Delete
                    </Button>
                )}
                {(user?.authData?._id === post.author) && (
                    <div className={classes.overlay2}>
                        <Button style={{color: 'white'}} size={'small'} onClick={() => setCurrentId(post._id!)}>
                            <MoreHorizIcon fontSize={'small'}/>
                        </Button>
                    </div>
                )}
            </CardActions>
        </Card>
    )
}

export default Post