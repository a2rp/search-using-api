require("dotenv").config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const userRoutes = require("./api/routes/user.routes");

const tokenKey = process.env.TOKEN_KEY || "";
if (tokenKey.length < 32) {
    throw new Error("Set TOKEN_KEY to a random secret of at least 32 characters in backend/.env.");
}

const allowedOrigins = new Set(
    (process.env.CLIENT_ORIGINS || "http://localhost:5173")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
);

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
    origin(origin, callback) {
        callback(null, !origin || allowedOrigins.has(origin));
    },
}));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "API is ready" });
});
app.use("/api", userRoutes);

const port = Number(process.env.PORT) || 1198;
app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
