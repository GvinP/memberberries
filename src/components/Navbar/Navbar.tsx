import React, {useEffect, useState} from 'react'
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import image from "../../images/icon-social.png";
import AppBar from "@material-ui/core/AppBar";
import useStyles from './styles'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {googleLogout} from '@react-oauth/google'
import Button from "@material-ui/core/Button";
import decode from "jwt-decode";
import {AuthDataType} from "../../reducers/authReducer";
import {useAppDispatch} from "../../app/hooks";
import {logoutAC} from "../../actions/authActions";

type DecodedTokenType = {
    email: string
    exp: number
    iat: number
    id: string
}

const Navbar = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const classes = useStyles()
    //@ts-ignore
    const [user, setUser] = useState<AuthDataType | null>(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = decode<DecodedTokenType>(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        //@ts-ignore
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch(logoutAC())
        googleLogout()
        navigate('/')
        setUser(null)
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <img className={classes.image} src={image} alt={'memories'} width={'40px'}/>
                <Typography className={classes.heading} component={Link} to={'/'} variant='h4'
                            align='center'>Memberberries</Typography>
            </div>
            <Toolbar>
                {user ?
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} src={user.authData?.image} alt={user.authData?.name}/>
                        <Typography className={classes.userName} variant={'h6'}>{user.authData?.name}</Typography>
                        <Button variant={'contained'} color={'secondary'} onClick={logout}>Logout</Button>
                    </div> :
                    <div className={classes.toolbar}>
                        <Button className={classes.logout} component={Link} to={'/login'} variant={'contained'}
                                color={'primary'}>Sign In</Button>
                    </div>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;