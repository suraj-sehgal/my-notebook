var jwt = require('jsonwebtoken');
const jwt_secret=process.env.JWT_SECRET;

const fetchuser = (req ,res ,next) =>{
    // Get the user from the jwt token and add id to the req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token1"})
    }
    try {
        const data = jwt.verify(token,jwt_secret);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).send({error: "Please authenticate using a valid token2"})
    }
}

module.exports = fetchuser;