const Specialist = require('@models/Specialist.model');

module.exports = {

    /**
     * returns all wishlists
     * @param query object 
     * @param options object
     */
    all: async ( query = {}, options = {} ) =>{

        //const {limit, sort} =  options;
        query["deletedAt"] = null;
        let specialist = await Specialist.find(query);
        return specialist;
    },

    /**
     * creates a single specialist instance
     * @param specialistData object
     * 
     */
    createSpecialist: async (specialistData) => {

        let specialist = new Specialist(specialistData);
        let result = await specialist.save(); 
        return result;
    },


    /**
     * returns a single instance of a specialist
     * @param specialistId String
     */
    viewSpecialist: async (specialistId) => {

        let specialist = await Specialist.findById(specialistId);
        return specialist;
    },


    /**
     * update a single specialist instance
     * @param specialistId integer
     * @param updateData object
     * 
     */
    updateSpecialist: async (specialistId, updateData) => {

        const result = await Specialist.findByIdAndUpdate( specialistId, updateData, {new: true});
        return result;
    },


    /**
     * performs a softDelete operation on a single instance of a  model
     * @param specialistId integer
     *
     */
    softDeleteSpecialist: async (specialistId) => {

        console.log(specialistId);
        const updateData = { deletedAt: Date.now(), deletedBy: '1edfhuio3ifj' };
        return await module.exports.updateWishlist(specialistId, updateData); 
    },
}