const jwt = require('jsonwebtoken')

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        if(!token){
            return res.status(200).json({
                message: "User not login!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            
            if(err){
                throw new Error(err.message);
            }

            req.userId = decoded?._id;
            next();

        })

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;