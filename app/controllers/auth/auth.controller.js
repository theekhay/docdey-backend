const User = require('@models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * API to authenticate a user.
 * @param username
 * @param password
 */
login = async function(req, res) {
    try {

        //const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     return res.status(422).json({
        //         errors: errors.array()
        //     });
        // }

        let credential = {
            email: req.body.email
        }

        let user = await User.findOne(credential);

        if (! user) {

            return res.status(401).json({
                success: 'false',
                message: "Invalid username/password ",
            });
        }

      

        bcrypt.compare(req.body.password, user.password, function (err, isMatch) {

            if (err) throw err;

            if (!isMatch) {
                return res.status(401).json({
                    success: 'false',
                    message: "Invalid username/password combination",
                });
            }

            //generate the token
            let token = jwt.sign({
                user
            }, process.env.JWT_KEY, {
                expiresIn: process.env.JWT_TOKEN_VALIDATON_LENGTH
            })

            return res.status(200).json({
                success: 'true',
                message: "user has been logged in succesfully",
                token,
                user
            });

        });

    } catch (e) {
        console.log(e);
    }


};

/**
 * API to logout a user.
 * @param username
 */
logout = function(req, res) {

    res.json({mesage: "user has been logged oiut"})
};


//Get the currently authenticated user with the request auth token.
getAuthUser = async function(req) {

    const bearerHeader = req.headers['authorization'];
    
    if( typeof bearerHeader !== 'undefined'){

        let token = bearerHeader.split(' ')[1];

        try {
            let decoded = jwt.verify(token, process.env.JWT_KEY);
            return decoded.user;
        } 
        catch(e) {
            throw("invalid user")
        }
    }
    else{
        throw("invalid token")
    }
}


module.exports = {
    login,
    logout,
    getAuthUser
}