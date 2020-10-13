const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const authHeader = req.header("authorization");
    console.log(req.header('authorization'));
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } else {
        res.sendStatus(401);
    }
};