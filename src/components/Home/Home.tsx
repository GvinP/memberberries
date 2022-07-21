import React, {useEffect, useState, KeyboardEvent} from 'react';
import Grid from "@material-ui/core/Grid";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ChipInput from 'material-ui-chip-input'
import useStyles from './styles'
import {useAppDispatch, useAppSelector, useQuery} from "../../app/hooks";
import {getPostsTC, searchPostsTC} from "../../actions/postsActions";
import {useLocation, useNavigate} from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Container from "@material-ui/core/Container";

const Home = () => {
    const [currentId, setCurrentId] = useState<string | null>(null)
    const [search, setSearch] = useState<string>('')
    const [tags, setTags] = useState<Array<string>>([])
    const classes = useStyles()
    const dispatch = useAppDispatch()
    const location = useLocation()
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    const searchPost = () => {
        if (search.trim()|| tags.length>0) {
            dispatch(searchPostsTC({search, tags: tags.join(',')}))
            navigate(`search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
            setSearch('')
            setTags([])
        } else {
            navigate('/')
        }
    }
    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            searchPost()
        }
    }
    const handleAddTag = (tag: string) => setTags([...tags, tag])
    const handleDeleteTag = (tag: string) => setTags(tags.filter(t => t !== tag))

    return (
        <Grow in>
            <Container maxWidth={'xl'}>
                <Grid className={classes.gridContainer} container justifyContent={'space-between'}
                      alignItems={'stretch'}
                      spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position={'static'} color={'inherit'}>
                            <TextField name={'search'} variant={'outlined'} label={'Search post'} fullWidth
                                       value={search}
                                       onChange={(e) => setSearch(e.target.value)}
                                       onKeyPress={handleKeyPress}/>
                            <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={handleAddTag}
                                       onDelete={handleDeleteTag} label={'Search Tags'} variant={'outlined'}/>
                            <Button className={classes.searchButton} onClick={searchPost} color={'primary'}
                                    variant={'contained'}>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination page={+page}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;