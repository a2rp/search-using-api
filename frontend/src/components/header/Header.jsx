import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { clearSavedToken, getSavedToken } from "../../api";
import styles from "./styles.module.scss";

export default function Header() {
    const navigate = useNavigate();
    const [token, setToken] = useState(getSavedToken);

    const handleLogout = () => {
        clearSavedToken();
        setToken("");
        navigate("/login", { replace: true });
    };

    return (
        <header className={styles.headerContainer}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar component="nav" aria-label="Main navigation">
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <NavLink className={styles.navlink} to="/home">TV Show Finder</NavLink>
                        </Typography>
                        {token ? <>
                            <Button component={NavLink} to="/search" color="inherit">Search</Button>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </> : <Button component={NavLink} to="/login" color="inherit">Login</Button>}
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    );
}
