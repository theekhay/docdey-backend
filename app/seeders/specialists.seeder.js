const faker = require('faker');
const { randomInt } = require("@helpers/number.helper");

const specialistCategory = ["birthday", "cooperate", "wedding", "house party", "sports"];

//models
const Specialist = require("@models/Specialist.model");


const seedSpecialists = async (req, res) => {

    specialistCode =  [];

    const specialistCount = parseInt(req.query.specialistCount) || randomInt(1, 3);
    const specialists = [];

    for( let count = 0; count < specialistCount; count++){

        let specialist = specialistFactory();
        specialists.push(specialist);
    }

    Specialist.collection.insert( specialists, function (err, data) {
        if (err){ 
            
            res.status(400).json({
                success: false,
                message: "error generating and saving specialists",
                data: err
            });

        } 
        else {
            res.status(201).json({
                success: "true",
                message: "specialists generated and saved successfully",
                data: specialists
            });
        }
    });  
}


const specialistFactory =  () => {

    
    const specialist = {

        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        dob: faker.date.past(),
        address: faker.address.streetAddress(),
        uuid: faker.random.uuid(),
        role: faker.lorem.word(),
        yearsOfExperience: faker.random.number(10),
    
        createdAt: new Date,
        updatedAt: new Date,
    }

    specialist.fullName = `${specialist.firstName} ${specialist.lastName}`
    return specialist;
}

module.exports = { seedSpecialists }