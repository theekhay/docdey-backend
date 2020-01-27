const service = require('@services/medication.service');
const uuidv4 = require('uuid/v4');

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
        
    }
}