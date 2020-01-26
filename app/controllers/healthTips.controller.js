const service = require('@services/healthTip.service');
const uuidv4 = require('uuid/v4');
const {
    randomInt
} = require("@helpers/number.helper");

module.exports = {

     getRandomTip: async(req, res) => {

        try {

            let tips = await service.all();
            let index = randomInt(0, tips.length - 1 );
            let tip = tips[index];

            res.status(200).send({
                success: true,
                message: "health tip retreived successfully",
                data: tip
            });

        } catch (e) {

            res.status(400).send({
                success: false,
                message: "Error performing this operation",
                data: e.toString()
            });
        }
    }
}