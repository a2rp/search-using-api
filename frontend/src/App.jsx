import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import loadingGIF from "./assets/images/loading-gif.gif";
import "./App.css";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Search = lazy(() => import("./pages/search"));

export default function App() {
    return (
        <div className="App">
            <main className="routesContainer">
                <Suspense fallback={<div className="loadingPage" role="status"><img src={loadingGIF} alt="" /><span>Loading page...</span></div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}
