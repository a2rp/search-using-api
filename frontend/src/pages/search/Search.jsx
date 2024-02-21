import React, { useEffect, useState } from 'react'
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import Header from '../../components/header';
import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';

import parse from 'html-react-parser';

const Search = () => {
    const navigate = useNavigate(null);
    const [token, setToken] = useState(window.localStorage.getItem("token") || "");
    useEffect(() => {
        if (token.length === 0) {
            navigate("/login");
        }
    }, [token]);
    const [tvData, setTvData] = useState([]);
    const [response, setResponse] = useState("");

    const [searchInput, setSearchInput] = useState("");
    const handleSubmit = () => {
        const title = searchInput;
        setTvData({});
        setResponse("");
        document.querySelector(".searchButton").disabled = true;
        axios({
            method: "post",
            url: `http://localhost:1198/api/search?title=${title}`,
            headers: { Authorization: token }
        }).then(response => {
            console.log(response.data.message);
            setTvData(response.data.message);
        }).catch(error => {
            console.log(error);
            setResponse(error.message);
        }).finally(() => {
            document.querySelector(".searchButton").disabled = false;
        });
    };

    useEffect(() => {
        // console.log(tvData);
        // Object.keys(tvData).map(item => {
        //     console.log("effect ", tvData[item].score);
        // });
    }, [tvData]);

    return (
        <div className={styles.container}>
            <Header />
            <h1>Search Items</h1>
            <div className={styles.searchSection}>
                <input type="text" name="search" placeholder="Search" onChange={(event) => setSearchInput(searchInput => event.target.value)} value={searchInput} />

                <input type="button" value="Search" className="searchButton" onClick={handleSubmit} />
            </div>

            <div style={{ marginTop: "30px" }}>
                {tvData.length === 0 ? <>
                    No Data Available
                </> : <>
                    {Object.keys(tvData).map((item, index) => (
                        // show poster, name, summary, type, language, genres, status, and schedule.
                        <Card key={index} sx={{ maxWidth: "300", margin: 5 }}>
                            <CardMedia component="img" height="140" image={tvData[item].show.image ? tvData[item].show.image.medium : ""} className={styles.media} />
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    <b>Name:</b> {tvData[item].show.name}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    <b>Summary:</b> {parse(tvData[item].show.summary)}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <b>Type:</b> {tvData[item].show.type}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <b>Language:</b> {tvData[item].show.language}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <b>Genre:</b> {tvData[item].show.genres.map((genre, index) => (<b key={index}>{genre} </b>))}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <b>Status:</b> {tvData[item].show.status}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    <b>Schedule:</b> {Object.keys(tvData[item].show.schedule).map((scheduleItem, index) => (<b key={index}>
                                        {scheduleItem} - {tvData[item].show.schedule[scheduleItem]}<br />
                                    </b>))}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>
                    ))}
                </>}
            </div>
        </div>
    )
}

export default Search
