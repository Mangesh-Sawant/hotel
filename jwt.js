const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    //  TOken not found
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ error: 'token not found' });

    const token = authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}

// generete token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 30000 });
}
module.exports = { jwtAuthMiddleware, generateToken };