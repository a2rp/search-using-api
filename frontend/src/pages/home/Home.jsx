import Button from "@mui/material/Button";
import Header from "../../components/header";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

export default function Home() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.hero}>
                <p className={styles.eyebrow}>TVMaze show search</p>
                <h1>Find your next show to watch.</h1>
                <p className={styles.description}>
                    Search a catalog of TV series and explore summaries, genres, schedules, and more.
                </p>
                <Button component={NavLink} to="/login" variant="contained" size="large">Start searching</Button>
            </main>
        </div>
    );
}
