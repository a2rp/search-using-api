const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const [scheme, token] = (req.get("authorization") || "").split(" ");

    if (scheme?.toLowerCase() !== "bearer" || !token) {
        return res.status(401).json({
            success: false,
            message: "A bearer token is required for authentication",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY, {
            issuer: "search-using-api",
            audience: "search-using-api",
        });
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = verifyToken;
