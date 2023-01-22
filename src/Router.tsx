import React, { useState } from "react";
import Home from "./pages/Home" //rafce
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Search from "./pages/search";
import Recipe from "./pages/recipe-info";
import All from "./pages/all-recipes";
import Chef from "./pages/chef-porfolio";
import User from "./pages/user-porfolio";
import LogIn from "./pages/login";
import Register from "./pages/register";
import Tobuylist from "./pages/tobuylist";
import Error from "./pages/error";
import loginType from "./typings/UserToken";

import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";


const Router: React.FC = () => {
    const [login, setLogin] = useState<loginType>({
        status: 'none',
        username: '',
        follow: [],
        TODO: [],
        DONE: []
    });
    return <>
        <HashRouter>
            <NavBar login={login}></NavBar>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/search/:query" element={<Search />}></Route>
                <Route path="/recipes/:item" element={<Recipe />}></Route>
                <Route path="/all" element={<All />}></Route>
                <Route path="/chef/:name" element={<Chef />}></Route>
                <Route path="/login" element={<LogIn setLogin={setLogin} login={login} />}></Route>
                <Route path="/user/:name" element={<User login={login} />}></Route>
                <Route path="/register" element={<Register setLogin={setLogin} login={login} />}></Route>
                <Route path="/tobuylist" element={<Tobuylist setLogin={setLogin} login={login} />}></Route>
                <Route path="*" element={<Error />}></Route>
            </Routes>
            <Footer></Footer>
        </HashRouter>
    </>
}

export default Router