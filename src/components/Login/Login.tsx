import React, {ChangeEvent, FormEvent, useState} from 'react';
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles'
import Input from "./Input";
import {useAppDispatch} from "../../app/hooks";
import {loginAC, loginTC, registrationTC} from "../../actions/authActions";
import jwtDecode from "jwt-decode";
import {GoogleAuthType} from "../../api/api";
import {useNavigate} from "react-router-dom";


const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export type FormDataType = typeof initialState

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const classes = useStyles()
    const [isSignUp, setIsSignUp] = useState(false)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isSignUp) {
            dispatch(registrationTC(formData, navigate))
        } else {
            dispatch(loginTC(formData, navigate))
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const googleSuccess = (response: CredentialResponse) => {
        const decoded: GoogleAuthType = jwtDecode(response?.credential!)
        debugger
        const user = {
            result: {
                _id: decoded.sub,
                _type: 'user',
                name: decoded.name,
                image: decoded.picture,
            },
            token: response?.credential!
        }
        dispatch(loginAC(user))
        navigate('/')
    }
    const googleError = () => {

    }
    const handlerShowPassword = () => setShowPassword(prevState => !prevState)
    const switchMode = () => setIsSignUp(prevState => !prevState)

    return (
        <Container component={'main'} maxWidth={'xs'}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant={'h5'}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp &&
                            <>
                                <Input name={'firstName'} label={'First Name'} handleChange={handleChange} autoFocus
                                       half/>
                                <Input name={'lastName'} label={'Last Name'} handleChange={handleChange} half/>
                            </>}
                        <Input name={'email'} label={'Email Address'} handleChange={handleChange}
                               type={'email'}/>
                        <Input name={'password'} label={'Password'} handleChange={handleChange}
                               type={showPassword ? 'text' : 'password'} handlerShowPassword={handlerShowPassword}/>
                        {isSignUp && <Input name={'confirmPassword'} label={'Confirm Password'}
                                            handleChange={handleChange} type={'password'}/>}
                    </Grid>
                    <Button type={'submit'} fullWidth variant={'contained'} color={'primary'}
                            className={classes.submit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
                    <div className={classes.googleButton}>
                        <GoogleOAuthProvider
                            clientId={'69485692774-brp7th84c8hu6sgcql958b3gkucm24cp.apps.googleusercontent.com'}>
                            <GoogleLogin onSuccess={(credentialResponse) => googleSuccess(credentialResponse)}
                                         onError={googleError}
                            />
                        </GoogleOAuthProvider>
                    </div>
                    <Grid container justifyContent={'flex-end'}>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : 'Dont\'t have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Login;