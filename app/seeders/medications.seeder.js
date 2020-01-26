const faker = require('faker');
const { randomInt } = require("@helpers/number.helper");

//models
const Medication = require("@models/Medication.model");

const seedMedications = async (req, res) => {

    const medicationCount = parseInt(req.query.medicationCount) || randomInt(1, 3);
    const itemCount = parseInt(req.query.itemCount) || randomInt(1, 3);
    const medications = [];

    for( let count = 0; count < medicationCount; count++){

        let medication = factory(itemCount);
        medications.push(medication);
    }

    Medication.collection.insert( medications, function (err, data) {
        if (err){ 
            
            res.status(400).json({
                success: false,
                message: "error generating and saving events",
                data: err
            });

        } 
        else {
            res.status(201).json({
                success: "true",
                message: "events generated and saved successfully",
                data: medications
            });
        }
    });  
}


const factory = ( itemcount ) => {

    const createdBy = "89n98nv939nf30";
    const items = [];

    const history = {
        event: "MEDICATION_CREATE",
        comment: `medication created by ${createdBy}`,
        createdAt: new Date,
        userId: createdBy
    }

    for( let i = 0; i < itemcount; i++ ){

        item = {
            name: faker.lorem.word(),
            quantity: faker.random.number()
        }

        items.push(item);
    }

    let medication = {

        name: faker.lorem.word(),
        uuid: faker.random.uuid(),
        createdBy: createdBy,
        createdAt: new Date,
        updatedAt: new Date,
        history: history,
        items
    }

    return medication;
}

module.exports = { seedMedications }