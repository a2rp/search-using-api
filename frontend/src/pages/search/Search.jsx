import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Header from "../../components/header";
import { clearSavedToken, getSavedToken, requestJson } from "../../api";
import styles from "./styles.module.scss";

function summaryAsText(summary) {
    if (typeof summary !== "string") return "No summary available.";
    const parsedSummary = new DOMParser().parseFromString(summary, "text/html");
    return (parsedSummary.body.textContent || "").replace(/\s+/g, " ").trim() || "No summary available.";
}

function ShowCard({ show }) {
    const image = show.image?.medium || show.image?.original;
    const schedule = [show.schedule?.days?.join(", "), show.schedule?.time].filter(Boolean).join(" at ");

    return (
        <Card className={styles.showCard} component="article">
            {image && <CardMedia component="img" image={image} alt={`${show.name || "Show"} poster`} className={styles.media} />}
            <CardContent className={styles.cardContent}>
                <Typography variant="h2" component="h2" className={styles.showTitle}>{show.name || "Untitled show"}</Typography>
                <Typography component="p" className={styles.summary}>{summaryAsText(show.summary)}</Typography>
                <dl className={styles.details}>
                    {show.type && <><dt>Type</dt><dd>{show.type}</dd></>}
                    {show.language && <><dt>Language</dt><dd>{show.language}</dd></>}
                    {show.genres?.length > 0 && <><dt>Genres</dt><dd>{show.genres.join(", ")}</dd></>}
                    {show.status && <><dt>Status</dt><dd>{show.status}</dd></>}
                    {schedule && <><dt>Schedule</dt><dd>{schedule}</dd></>}
                </dl>
            </CardContent>
            {show.url && <CardActions className={styles.cardActions}>
                <Button component="a" href={show.url} target="_blank" rel="noreferrer">View on TVMaze</Button>
            </CardActions>}
        </Card>
    );
}

export default function Search() {
    const navigate = useNavigate();
    const [token, setToken] = useState(getSavedToken);
    const [searchInput, setSearchInput] = useState("");
    const [shows, setShows] = useState([]);
    const [error, setError] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const requestRef = useRef(null);

    useEffect(() => {
        if (!token) navigate("/login", { replace: true });
        return () => requestRef.current?.abort();
    }, [navigate, token]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const title = searchInput.trim();
        if (!title) {
            setError("Enter a show title to search.");
            setShows([]);
            setHasSearched(false);
            return;
        }

        requestRef.current?.abort();
        const controller = new AbortController();
        requestRef.current = controller;
        setError("");
        setShows([]);
        setHasSearched(true);
        setIsSearching(true);

        try {
            const query = new URLSearchParams({ title });
            const result = await requestJson(`/search?${query}`, {
                headers: { Authorization: `Bearer ${token}` },
                signal: controller.signal,
            });
            setShows(Array.isArray(result.results) ? result.results : []);
        } catch (requestError) {
            if (requestError.name === "AbortError") return;
            if (requestError.status === 401) {
                clearSavedToken();
                setToken("");
                navigate("/login", { replace: true });
                return;
            }
            setError(requestError instanceof Error ? requestError.message : "Search failed. Please try again.");
        } finally {
            if (!controller.signal.aborted) setIsSearching(false);
        }
    };

    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.content}>
                <Typography variant="h1" component="h1">Search TV shows</Typography>
                <Typography component="p" className={styles.intro}>Find show details from the TVMaze catalog.</Typography>
                <Box component="form" className={styles.searchSection} onSubmit={handleSubmit}>
                    <label className={styles.visuallyHidden} htmlFor="show-search">Show title</label>
                    <input
                        id="show-search"
                        type="search"
                        name="search"
                        placeholder="Search by show title"
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        maxLength={100}
                    />
                    <Button type="submit" variant="contained" disabled={isSearching || !token}>
                        {isSearching ? "Searching..." : "Search"}
                    </Button>
                </Box>
                <section className={styles.results} aria-busy={isSearching}>
                    {isSearching && <p role="status">Searching TVMaze...</p>}
                    {error && <p className={styles.message} role="alert">{error}</p>}
                    {!isSearching && !error && !hasSearched && <p className={styles.message}>Enter a title to see matching shows.</p>}
                    {!isSearching && !error && hasSearched && shows.length === 0 && <p className={styles.message}>No shows found. Try another title.</p>}
                    {shows.length > 0 && <div className={styles.showGrid}>
                        {shows.map(({ show }) => show && <ShowCard key={show.id} show={show} />)}
                    </div>}
                </section>
            </main>
        </div>
    );
}
