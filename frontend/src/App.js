import "./App.css";

import { useEffect, useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import loadingGIF from "./assets/images/loading-gif.gif";

// lazy loading of pages for performance
const Home = lazy(() => wait(500).then(() => import("./pages/home")));
const Login = lazy(() => wait(500).then(() => import("./pages/login")));
const Search = lazy(() => wait(500).then(() => import("./pages/search")));


function App() {
    return (
        <div className="App">
            <div className="routesContainer">
                {/* loading gif image is shown before loading componemts */}
                <Suspense fallback={<img src={loadingGIF} />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </Suspense>
            </div>
        </div>
    );
}

export default App;

// time delay to load components
const wait = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}
