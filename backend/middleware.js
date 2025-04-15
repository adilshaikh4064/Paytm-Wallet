const jwt = require("jsonwebtoken");
const { JWT_SECRET_CODE } = require("./config");
const { UserModel } = require("./db");

async function userMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({
            message: "Authorization token missing or malformed in header",
        });
    }

    const jwt_token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(jwt_token, JWT_SECRET_CODE);
        const user=await UserModel.findOne({email:decoded.email});
        req.email = decoded.email;
        req.userId= user._id;
        next();
    } catch (error) {
        res.status(400).json({
            message: "invalid authorization token",
        });
    }
}

module.exports = {
    userMiddleware,
};
