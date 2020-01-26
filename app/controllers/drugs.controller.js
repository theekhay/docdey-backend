const service = require('@services/drug.service');
const uuidv4 = require('uuid/v4');


module.exports = {

    /**
     * get drugs
     */
    index: async (req, res) => {

        try {
            let drugs = await service.all();
            console.log(drugs);

            res.status(200).send({
                success: true,
                message: "drugs retreived succesfully",
                data: drugs
            });
        } catch (e) {

            res.status(400).send({
                success: false,
                message: "error performing this operation",
                data: e.toString()
            });
        }

    },

    create: async (req, res) => {

        let drug = req.body;
        drug.createdBy = "76trfguiolk";
        drug.uuid = uuidv4();

        try {
            await service.createDrug(drug);
            res.status(200).send({
                success: true,
                message: "Drug created successfully",
                data: drug
            });
        } catch (e) {

            res.status(400).send({
                success: false,
                message: "Error performing this operation",
                data: e.toString()
            });
        }
    },

    getInteraction: async (req, res) => {

        let drug1 = req.params.drug1;
        let drug2 = req.params.drug2;

        if(! drug1 || ! drug2){

            res.status(400).send({
                success: false,
                message: "Invalid params provided.",
                data: e.toString()
            });
        }

        //check that both drugs are valid drugs

        try {
            let resp = await service.getInteraction(drug1, drug2);
            let interaction = resp.interactions[0];

            res.status(200).send({
                success: true,
                message: "Interacion created successfully",
                data: interaction
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