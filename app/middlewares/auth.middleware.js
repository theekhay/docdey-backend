const jwt = require('jsonwebtoken');

module.exports.isAuthorized = function (req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {

        let token = bearerHeader.split(' ')[1];
        req.token = token;
        verifyToken(req, res, next);
    }
    else {
        res.status(403).json({
            success: false,
            message: "Authorization needed"
        });
    }
}

function verifyToken(req, res, next) {

    jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {

        if (err) {

            res.status(403).json({ message: 'unauthorized.', error: err });
        }
        else {
            next();
        }

    })
}