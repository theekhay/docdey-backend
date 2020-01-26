const service = require('@services/specialist.service');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');

module.exports = {

    index: async (req, res) => {

        try {
            const specialists = await service.all();
            return res.status(200).json({

                data: specialists,
                successful: true,
                message: "Specialists retreived successfully"
            });
        } catch (err) {

            return res.status(400).json({

                data: err.toString(),
                successful: false,
                message: "Error reteiving promotion list"
            });
        }
    },

    create: async (req, res) => {

        try{

            let specialist = req.body;
            specialist.uuid = uuidv4();
            specialist.fullName = `${specialist.firstName} ${specialist.lastName}`;
            specialist.password =  bcrypt.hashSync(specialist.password, 8);

            await service.createSpecialist(specialist);
            //sendAccountConfirmationNotification();
            res.status(200).send({
                success: true,
                message: "Specialist created successfully",
                data: specialist
            });
        }
        catch(e){
    
            res.status(400).send({
                success: false,
                message: "Error performing this operation",
                data: e.toString()
            });
        }
    }
}