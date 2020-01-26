const Drug = require('@models/Drug.model');

module.exports = {

    /**
     * returns all wishlists
     * @param query object 
     * @param options object
     */
    all: async ( query = {}, options = {} ) =>{

        //const {limit, sort} =  options;
        query["deletedAt"] = null;
        let drug = await Drug.find(query);
        return drug;
    },

    /**
     * creates a single drug instance
     * @param drugData object
     * 
     */
    createDrug: async (drugData) => {

        let drug = new Drug(drugData);
        let result = await drug.save(); 
        return result;
    },


    /**
     * returns a single instance of a drug
     * @param drugId String
     */
    viewDrug: async (drugId) => {

        let drug = await Drug.findById(drugId);
        return drug;
    },


    /**
     * update a single drug instance
     * @param drugId integer
     * @param updateData object
     * 
     */
    updateDrug: async (drugId, updateData) => {

        const result = await Drug.findByIdAndUpdate( drugId, updateData, {new: true});
        return result;
    },


    /**
     * performs a softDelete operation on a single instance of a  model
     * @param drugId integer
     *
     */
    softDeleteDrug: async (drugId) => {

        console.log(drugId);
        const updateData = { deletedAt: Date.now(), deletedBy: '1edfhuio3ifj' };
        return await module.exports.updateWishlist(drugId, updateData); 
    },

    getInteraction: async(drug1, drug2) => {

        let interaction = await Drug.findOne({ name: drug1, "interactions.drug": drug2 }, {
            'interactions.$': 1
          });
        return interaction;
    }
}