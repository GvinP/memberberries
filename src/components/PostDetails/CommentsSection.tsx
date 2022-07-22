import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import useStyles from './styles'
import {useAppDispatch} from "../../app/hooks";
import {PostType} from "../../reducers/postsReducer";
import {commentPostTC} from "../../actions/postsActions";

type CommentsSectionPropsType = {
    post: PostType
}

const CommentsSection = ({post}: CommentsSectionPropsType) => {
    const classes = useStyles()
    const [comments, setComments] = useState<Array<string>>(post.comments)
    const [comment, setComment] = useState('')
    const dispatch = useAppDispatch()
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('profile'))
    const commentsRef = useRef<HTMLDivElement>(null)

    const handleClick = async () => {
        const newComments = await dispatch(commentPostTC(`${user.authData.name}: ${comment}`, post._id!))
        setComments([...newComments!])
        setComment('')
        commentsRef.current?.scrollIntoView()
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant={'h6'}>Comments</Typography>
                    {comments.map((comment, index) => (
                        <Typography gutterBottom variant={'subtitle1'} key={index}>
                            <strong>{comment.split(': ')[0]}</strong>
                            {comment.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}/>
                </div>
                {user?.authData?.name ? (
                    <div style={{width: '70%'}}>
                        <Typography gutterBottom variant={'h6'}>Write a comment</Typography>
                        <TextField variant={'outlined'} fullWidth minRows={4} multiline label={'Comment'} value={comment}
                                   onChange={e => setComment(e.target.value)}/>
                        <Button variant={'contained'} disabled={!comment} style={{marginTop: '10px'}} color={'primary'}
                                onClick={handleClick}>Comment</Button>
                    </div>
                ): null}
            </div>
        </div>
    );
};

export default CommentsSection;