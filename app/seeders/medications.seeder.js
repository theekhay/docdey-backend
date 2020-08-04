const faker = require('faker');
const { randomInt } = require("@helpers/number.helper");
const allowedDosageTimes = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "24:00"];
//models
const Medication = require("@models/Medication.model");

const seedMedications = async (req, res) => {

    const medicationCount = parseInt(req.query.medicationCount) || randomInt(1, 3);
    const medications = [];

    for( let count = 0; count < medicationCount; count++){

        let medication = factory();
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


const factory = () => {

    const createdBy = "89n98nv939nf30";

    const history = {
        event: "MEDICATION_CREATE",
        comment: `medication created by ${createdBy}`,
        createdAt: new Date,
        userId: createdBy
    }

    let medication = {

        drugs: getDrugs(),
        dosage: randomInt(1, 4),
        dosageStart: faker.date.future(),
        dosageEnd: faker.date.future(),
        uuid: faker.random.uuid(), 
        createdBy: createdBy,
        createdAt: new Date,
        updatedAt: new Date,
        history,
    }

    medication.dosageTimes = getDosageTimes(medication.dosage);

    return medication;
}

getDrugs = function(){

    let drugCount = randomInt(1, 3);
    drugs = []

    for(let i = 0; i < drugCount; i++){

        let drug = {
            id: randomInt(1234, 6789),
            name: faker.lorem.word()
        };

        drugs.push(drug);
    }

    return drugs;

}

getDosageTimes = function(dosage){

    let dosages = [];
    let count = 0;

    while(count < dosage ){
        let randInt = randomInt(0, 8);
        if( dosages.includes(allowedDosageTimes[randInt]) ) continue;
        dosages.push( allowedDosageTimes[randInt]);
        count++;
    }

    return dosages;
}

module.exports = { seedMedications }