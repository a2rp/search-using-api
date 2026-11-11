const express = require("express");
const rateLimit = require("express-rate-limit").rateLimit;
const auth = require("../middlewares/auth");
const { login, search } = require("../controllers/user.controller");

const router = express.Router();
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many login attempts. Try again later." },
});
const searchLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many searches. Try again later." },
});

router.post("/login", loginLimiter, login);
router.get("/search", auth, searchLimiter, search);

module.exports = router;
