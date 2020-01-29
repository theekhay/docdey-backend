const service = require('@services/medication.service');
const uuidv4 = require('uuid/v4');
const moment = require("moment");

module.exports = {
    index: async (req, res) => {

        try {
            const medications = await service.all();
            return res.status(200).json({
                data: medications,
                successful: true,
                message: "Medications retreived successfully"
            });
        } catch (err) {

            return res.status(400).json({

                successful: false,
                message: "Error reteiving medication list",
                data: err.toString(),
            });

        }

    },

    activeMedication: async (req, res) => {

        try {
            let userId = req.params.userId;
            let meds = await service.activeMedication(userId);
            console.log(meds);
            return res.status(200).json({
                successful: true,
                message: "Medications retreived successfully",
                data: meds,
            });
        } catch (err) {} {

            return res.status(400).json({

                successful: false,
                message: "Error getting active medications",
                data: err,
            });
        }
    },


    /**
     * create a new medication
     */
    create: async (req, res) => {

        let medication = req.body;
        medication.createdBy = "76trfguiolk";
        medication.uuid = uuidv4();

        try {
            await service.createMedication(medication);
            return res.status(200).send({
                success: true,
                message: "Medication created successfully.",
                data: medication
            });
        } catch (e) {

            return res.status(400).send({
                success: false,
                message: "Error performing this operation",
                data: e.toString()
            });
        }
    }

}