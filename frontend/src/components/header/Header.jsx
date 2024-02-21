import React, { useState } from 'react'
import styles from "./styles.module.scss";
import { NavLink, useNavigate } from "react-router-dom";

// material ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    const navigate = useNavigate(null);

    const [token, setToken] = useState(window.localStorage.getItem("token") || "");
    const handleLogout = (event) => {
        event.preventDefault();
        window.localStorage.clear();
        window.location.reload();
    }

    return (
        <div className={styles.headerContainer}>
            {/* <NavLink className={styles.navlink} to="/home">Home</NavLink>
            {token.length > 0
                ? <>
                    <NavLink className={styles.navlink} to="/search">Search</NavLink>
                    <div className={styles.navlink} onClick={handleLogout}>Logout</div>
                </>
                : <>
                    <NavLink className={styles.navlink} to="/login">Login</NavLink>
                </>} */}
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavLink className={styles.navlink} to="/home" style={{ color: "#fff", textDecoration: "none" }}>Home</NavLink>
                        </Typography>
                        {token.length > 0
                            ? <>
                                {/* <NavLink className={styles.navlink} to="/search">Search</NavLink> */}
                                <Button color="inherit">
                                    <NavLink className={styles.navlink} to="/search" style={{ color: "#fff", textDecoration: "none" }}>Search</NavLink>
                                </Button>
                                {/* <div className={styles.navlink} onClick={handleLogout}>Logout</div> */}
                                <Button color="inherit" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                            : <>
                                {/* <NavLink className={styles.navlink} to="/login">Login</NavLink> */}
                                <Button color="inherit">
                                    <NavLink className={styles.navlink} to="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</NavLink>
                                </Button>
                            </>}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header
