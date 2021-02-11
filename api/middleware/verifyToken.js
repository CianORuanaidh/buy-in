const { verifyToken } = require('../tokens/tokenService');

exports.verifyToken = async (req, res, next) => {
    
    const { cookies } = req;

    try {
        
        if (!cookies || !cookies.token) {
            res.status(403).json({ message : 'authorization required' });
            return;
        }

        const token = cookies.token;
        const user = await verifyToken(token);

        req.user = user;

        next();

    } catch (ex) {
        
        console.log({ message: 'error verifying token', error: ex });
        res.status(403).json({ message: 'error verifying token', error: ex });
    }

};