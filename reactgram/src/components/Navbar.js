import './Navbar.css';
import { Link, NavLink } from "react-router-dom";
import {
    HiHome,
    HiOutlineSearch,
    HiLogout,
    HiCamera,
    HiUser,
} from "react-icons/hi";

// hooks
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Redux
import { logout, reset } from "../slices/authSlice";

const Navbar = () => {
    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())

        navigate("/login")
    }

    return (
        <nav id="nav">
            <Link to="/">ReactGram</Link>
            <form id="search-form">
                <HiOutlineSearch />
                <input type="text" placeholder="Pesquisar..." />
            </form>
            <ul id="nav-links">
                {auth ? (
                    <>
                        <li>
                            <NavLink to="/">
                                <HiHome />
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to={`/users/${user._id}`}>
                                    <HiCamera />
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink to="/profile">
                                <HiUser />
                            </NavLink>
                        </li>
                        <span onClick={handleLogout}>
                            <HiLogout />
                        </span>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
