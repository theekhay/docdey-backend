const service = require('@services/medication.service');
const uuidv4 = require('uuid/v4');
const moment = require("moment");

module.exports = {
    index: async ( req, res) => {

        try{
            const medications = await service.all();
            return res.status(200).json({
                data: medications,
                successful: true,
                message: "Medications retreived successfully"
            });
        }
        catch(err)
        {

            return res.status(400).json({

                successful: false,
                message: "Error reteiving medication list",
                data: err.toString(),
            });

        }
        
    },

    activeMedication: async(req, res) => {

        try{
            let userId = "5e2b1f3bfc7b63475cdd8be3";
            let meds = await service.activeMedication(userId);
            let dosageTimes = (meds.length > 0 ) ?  meds[0].dosageTimes : {};
            console.log(dosageTimes);
            return res.status(200).json({
                successful: true,
                message: "Medications retreived successfully",
                data: dosageTimes,
            });
        }
        catch(err){}
        {

            return res.status(400).json({

                successful: false,
                message: "Error getting active medications",
                data: err,
            });
        }
    }
}