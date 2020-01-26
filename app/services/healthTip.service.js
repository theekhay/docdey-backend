const HealthTip = require('@models/HealthTip.model');

module.exports = {

    /**
     * returns all health Tips
     * @param query object 
     * @param options object
     */
    all: async ( query = {}, options = {} ) =>{

        //const {limit, sort} =  options;
        query["deletedAt"] = null;
        let healthTip = await HealthTip.find(query);
        return healthTip;
    },

    /**
     * creates a single healthTip instance
     * @param healthTipData object
     * 
     */
    createHealthTip: async (healthTipData) => {

        let healthTip = new HealthTip(healthTipData);
        let result = await healthTip.save(); 
        return result;
    },


    /**
     * returns a single instance of a healthTip
     * @param healthTipId String
     */
    viewHealthTip: async (healthTipId) => {

        let healthTip = await HealthTip.findById(healthTipId);
        return healthTip;
    },


    /**
     * update a single healthTip instance
     * @param healthTipId integer
     * @param updateData object
     * 
     */
    updateHealthTip: async (healthTipId, updateData) => {

        const result = await HealthTip.findByIdAndUpdate( healthTipId, updateData, {new: true});
        return result;
    },


    /**
     * performs a softDelete operation on a single instance of a  model
     * @param healthTipId integer
     *
     */
    softDeleteHealthTip: async (healthTipId) => {

        console.log(healthTipId);
        const updateData = { deletedAt: Date.now(), deletedBy: '1edfhuio3ifj' };
        return await module.exports.updateWishlist(healthTipId, updateData); 
    },
}