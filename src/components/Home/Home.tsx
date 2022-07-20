import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useStyles from './styles'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getPostsTC} from "../../actions/postsActions";
import {useLocation, useNavigate} from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const Home = () => {
    const [currentId, setCurrentId] = useState<string | null>(null)
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const location = useLocation()

    useEffect(() => {
        dispatch(getPostsTC())
    }, [currentId, location])

    return (
        <Grow in>
            <Grid className={classes.container} container justifyContent={'space-between'} alignItems={'stretch'}
                  spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    <Paper className={classes.pagination} elevation={6}>
                        <Pagination/>
                    </Paper>
                </Grid>
            </Grid>
        </Grow>
    );
};

export default Home;