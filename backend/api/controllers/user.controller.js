const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userCreds = require("../middlewares/user-credentials");

const login = async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!email || !password || email.length > 254 || password.length > 72) {
        return res.status(400).json({ success: false, message: "Enter a valid email and password" });
    }

    const user = userCreds.find((candidate) => candidate.email === email);
    const passwordMatches = user ? await bcrypt.compare(password, user.passwordHash) : false;
    if (!user || !passwordMatches) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { sub: user.id, email: user.email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
            issuer: "search-using-api",
            audience: "search-using-api",
        },
    );
    return res.status(200).json({ success: true, token });
};

const search = async (req, res) => {
    const title = typeof req.query.title === "string" ? req.query.title.trim() : "";
    if (!title || title.length > 100) {
        return res.status(400).json({
            success: false,
            message: "Enter a show title between 1 and 100 characters",
        });
    }

    try {
        const response = await axios.get("https://api.tvmaze.com/search/shows", {
            params: { q: title },
            timeout: 10000,
        });
        return res.status(200).json({ success: true, results: response.data });
    } catch {
        return res.status(502).json({
            success: false,
            message: "The TV show service is temporarily unavailable. Try again shortly.",
        });
    }
};

module.exports = { login, search };
