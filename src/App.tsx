import React from 'react'
import Container from '@material-ui/core/Container'
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from "./components/Login/Login";
import PostDetails from "./components/PostDetails/PostDetails";

function App() {
    //@ts-ignore
    const user = JSON.parse(localStorage.getItem('profile'))

    return (
        <Container maxWidth='lg'>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Navigate to={'/posts'}/>}/>
                <Route path="/posts/" element={<Home/>}/>
                <Route path="/posts/search" element={<Home/>}/>
                <Route path="/posts/:id" element={<PostDetails/>}/>
                <Route path="/login" element={!user?<Login/>:<Navigate to={'/posts'}/>}/>
            </Routes>
        </Container>
    )
}

export default App
