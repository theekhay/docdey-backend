const Medication = require('@models/Medication.model');

module.exports = {

    /**
     * returns all wishlists
     * @param query object 
     * @param options object
     */
    all: async ( query = {}, options = {} ) =>{

        //const {limit, sort} =  options;
        query["deletedAt"] = null;
        let medication = await Medication.find(query);
        return medication;
    },

    /**
     * creates a single medication instance
     * @param medicationData object
     * 
     */
    createMedication: async (medicationData) => {

        let medication = new Medication(medicationData);
        let result = await medication.save(); 
        return result;
    },


    /**
     * returns a single instance of a medication
     * @param medicationId String
     */
    viewMedication: async (medicationId) => {

        let medication = await Medication.findById(medicationId);
        return medication;
    },


    /**
     * update a single medication instance
     * @param medicationId integer
     * @param updateData object
     * 
     */
    updateMedication: async (medicationId, updateData) => {

        const result = await Medication.findByIdAndUpdate( medicationId, updateData, {new: true});
        return result;
    },


    /**
     * performs a softDelete operation on a single instance of a  model
     * @param medicationId integer
     *
     */
    softDeleteMedication: async (medicationId) => {

        console.log(medicationId);
        const updateData = { deletedAt: Date.now(), deletedBy: '1edfhuio3ifj' };
        return await module.exports.updateWishlist(medicationId, updateData); 
    },

    activeMedication: async (userId) => {

        let checkDate = new Date();
        console.log("checkDate, userId");
        console.log(checkDate, userId);
        return await Medication.find(
            {
                userId: userId,
                dosageStart: { $lte: checkDate },
                dosageEnd: { $gte:checkDate }
            },
            {
                dosageTimes: 1
            }  
        )
    }
}