const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
    // done before monday
    // get token from header
    const token = req.headers('x-auth-token');

    // check if not token

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // verif token
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'token is not valid' })
    }
}

const accessToken = (phoneNumber, token) => {
    const user = { phone: phoneNumber }
    return jwt.sign(user, token, {expiresIn: '15min'})
}

const refreshToken = (phoneNumber, token) => {
    const sameUser = {phone: phoneNumber}
    return jwt.sign(sameUser, token)
}


module.exports = {
    auth,
    accessToken,
    refreshToken
}