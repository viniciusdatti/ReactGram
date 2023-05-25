import './App.css';

// Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// hooks
import { useAuth } from './hooks/useAuth'

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditProfile from "./pages/EditProfile/EditProfile";
import Publish from "./pages/Profile/Publish";

function App() {
    const { auth, loading } = useAuth()

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route
                            path="/"
                            element={ auth ? <Home /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/profile"
                            element={ auth ? <EditProfile /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/users/:id"
                            element={ auth ? <Publish /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/login"
                            element={ !auth ? <Login /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/register"
                            element={!auth ? <Register /> : <Navigate to="/register" />}
                        />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
