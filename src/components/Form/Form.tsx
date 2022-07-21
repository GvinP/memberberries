import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import useStyles from './styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {PostType} from "../../reducers/postsReducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {addPostTC, updatePostTC} from "../../actions/postsActions";

type FormPropsType = {
    currentId: string | null
    setCurrentId: (currentId: string | null) => void
}
const postDataInitialState = {
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
    likes: [],
}
const Form = ({setCurrentId, currentId}: FormPropsType) => {
    const [postData, setPostData] = useState<PostType>(postDataInitialState)
    const post = useAppSelector(state => currentId ? state.posts.posts.find(post => post._id === currentId) : null)
    const dispatch = useAppDispatch()
    const classes = useStyles()
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            convertFileToBase64(file, (file64: string) => {
                setPostData({...postData, selectedFile: file64})
            })
        }
    }

    const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (currentId) {
            dispatch(updatePostTC(currentId, {...postData, name: user?.authData?.name}))
        } else {
            dispatch(addPostTC({...postData, name: user?.authData?.name}))
        }
        clear()
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({...postData, title: '', message: '', tags: []})
    }

    if (!user?.authData?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant={'h6'}>
                    Please Sign In to create your own posts and like other's posts
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant={'h6'}>{currentId ? 'Editing' : 'Creating'} a memory</Typography>
                <TextField name={'title'}
                           variant={'outlined'}
                           label={'Title'}
                           focused={!!postData.title}
                           fullWidth
                           value={postData.title}
                           onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
                <TextField name={'message'}
                           variant={'outlined'}
                           label={'Message'}
                           focused={!!postData.message}
                           fullWidth
                           value={postData.message}
                           onChange={(e) => setPostData({...postData, message: e.target.value})}
                />
                <TextField name={'tags'}
                           variant={'outlined'}
                           label={'Tags'}
                           focused={!!postData.tags?.length}
                           fullWidth
                           value={postData.tags}
                           onChange={(e) => setPostData({...postData, tags: [...e.target.value.split(',')]})}
                />
                <div className={classes.fileInput}>
                    <label>
                        <input type="file"
                               onChange={uploadHandler}
                               multiple={false}
                        />
                    </label>
                </div>
                <Button style={{marginBottom: 10}} variant={'contained'} color={'primary'} size={'large'}
                        type={'submit'} fullWidth>Submit</Button>
                <Button className={classes.root} variant={'contained'} color={'secondary'} size={'small'}
                        onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form