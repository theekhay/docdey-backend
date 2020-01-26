const userService = require('@services/user.service');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const User = require('@models/User.model');



/**
 * API to authenticate a user.
 * @param username
 * @param password
 */
exports.login = function(req, res) {

    const errors = validationResult(req); 

    if (! errors.isEmpty() ) {
        return res.status(422).json({ errors: errors.array() });
    }

    let credential = { email: req.body.email }

    try{
        User.findOne(credential, function(err, user){

            if(err) throw err;
    
            if(! user){
    
                return res.status(401).json({
                    success: 'false',
                    message: "Invalid username/password ",
                });
            }
    
            bcrypt.compare( req.body.password, user.password, function(err, isMatch){
    
                if(err) throw err;
    
                if(! isMatch){
                    return res.status(401).json({
                        success: 'false',
                        message: "Invalid username/password combination",
                    });
                }
    
                 //generate the token
                 let token = jwt.sign({user}, process.env.JWT_KEY, { expiresIn: process.env.JWT_TOKEN_VALIDATON_LENGTH})
    
                 return res.status(200).json({
                     success: 'true',
                     message: "user has been logged in succesfully",
                     data: user,
                     token
                 });
    
            }) 
        });

    }
    catch(e)
    {
        console.log(e);
    }

    
};

/**
 * get users
 * @authlevel authenticated | admin
 */
index = async (req, res) => {
    
},


/**
 * create a new user.
 */
create = async (req, res) => {

    console.log("gets here");

    console.log(req.body);

    const user = req.body;

    if(! user ){
        return res.status(400).json({
            success: false,
            message: "user information not found."
        });
    }
    user.uuid = uuidv4();
    user.password =  bcrypt.hashSync(user.password, 8);
    user.fullname = `${user.firstname} ${user.lastname}`;

    try{
        await userService.createUser(user);
        return res.status(201).json({
            success: true,
            message: "User has been created successfully.",
            data: user
        });
    }
    catch(e)
    {
        return res.status(400).json({
            success: false,
            message: "error occured while trying to create user.",
            data: e.toString()
        });
    }

};


/**
 * update a single user model
 * 
 */
update = async (req, res) => {

    let userId = req.params.userId;
    let userData = req.body;

    if( ! userId){
        return res.status(400).json({
            success: false,
            message: "required User id missing."
        });
    }

    let user = await userService.viewUser(userId);
    
    if( ! user ){
        return res.status(404).json({
            success: false,
            message: "invalid user."
        });
    }

    try {
        
        let resp = await userService.updateUser(userId, userData);
        // userService.addUserHistory( userId, "USER_UPDATE")
        return res.status(200).json({
            success: true,
            message: "User information has been updated successfully.",
            data: resp
        });
    } catch (e) {
        
        return res.status(400).json({
            success: false,
            message: "Error occured while trying to update this user.",
            data: e
        });
    }
};


view = async (req, res) => {

    let userId = req.params.userId;

    if( ! userId ){

        return res.status(400).json({
            success: false,
            message: "invalid user id provided.",
        });
    }

    try {
        let user = await userService.viewUser(userId);

        if( ! user){

            return res.status(404).json({
                success: true,
                message: "User not found!."
            });
        }

        return res.status(200).json({
            success: true,
            message: "User retreived successfully.",
            data: user
        });
        
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Error occured while performing this operation.",
            data: e
        });
    }
};


/**
 * softDeletes a single user instance.
 * @authLevel - authenticated | isUserAdmin | isUserCreator
 */
softdelete = async (req, res) => { 

    
    let userId = req.params.userId;
    let userData = req.body;

    if( ! userId){
        return res.status(400).json({
            success: false,
            message: "required user id missing."
        });
    }

    let user = await userService.viewUser(userId);
    if( ! user ){
        return res.status(404).json({
            success: false,
            message: "invalid user."
        });
    }

    try {
        
        let resp = await userService.softDeleteUser(userId, userData);
        return res.status(200).json({
            success: true,
            message: "User information has been deleted successfully.",
            data: resp
        });
    } catch (e) {
        

        console.log(e)
        return res.status(400).json({
            success: false,
            message: "Error occured while trying to update this user.",
            data: e
        });
    }
};

module.exports = {index, create, view, update, softdelete}