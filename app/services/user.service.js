const User = require('@models/User.model');
// const eventService = require('@services/event.service');

module.exports = {

    /**
     * returns all users given certain parameters
     * @param query object 
     * @param options object
     */
    all: async ( query = {}, options = {} ) =>{

        //const {limit, sort} = options;
        query["deletedAt"] = null;
        let users = await User.find(query);
        return users;
    },

    /**
     * creates a new user
     * @param userData object
     */
    createUser: async (userData ) =>{

        console.log(userData);
        
        let user = new User(userData);
        let result = await user.save(); 
        return result; 
    },

    /**
     * returns a single instance of a user
     * @param userId String
     */
    viewUser: async (userId) => {

        let user = await User.findById(userId);
        return user;
    },


     /**
     * update a single user instance
     * @param userId integer
     * @param updateData object
     */
    updateUser: async (userId, updateData) => {

        const result = await User.findByIdAndUpdate( userId, updateData, {new: true});
        return result;
    },


    /**
     * performs a softDelete operation on a single instance of a user model
     * @param userId integer
     *
     */
    softDeleteUser: async (userId) => {

        const updateData = {deletedAt: Date.now(), deletedBy: '1edfhuio3ifj'};
        return await User.findByIdAndUpdate(userId, updateData);  
    }
}