const faker = require('faker');
const { randomInt } = require("@helpers/number.helper");

//models
const Drug = require("@models/Drug.model");


const seedDrugs = async (req, res) => {

    const drugCount = parseInt(req.query.drugCount) || randomInt(1, 3);
    const drugs = [];

    for( let count = 0; count < drugCount; count++){

        let drug = drugFactory();
        drugs.push(drug);
    }

    Drug.collection.insert( drugs, function (err, data) {
        if (err){ 
            
            res.status(400).json({
                success: false,
                message: "error generating and saving drugs",
                data: err
            });

        } 
        else {
            res.status(201).json({
                success: "true",
                message: "drugs generated and saved successfully",
                data: drugs
            });
        }
    });  
}


const drugFactory =  () => {

    const components = [
        {
            name: faker.lorem.word(),
            quanity: `${faker.random.number(10)}mls`
        },
        {
            name: faker.lorem.word(),
            quanity: `${faker.random.number(10)}mls`
        }
    ]
    
    const drug = {

        name: faker.lorem.word(),
        components: components,
        sideEffects: faker.lorem.words().split(' '),
        commonBrands: faker.lorem.words().split(' '),
        dosage: faker.lorem.word(),
        variants: faker.lorem.words().split(' '),
        uuid: faker.random.uuid(),

        createdAt: new Date,
        updatedAt: new Date,
    }

    return drug;
}

module.exports = { seedDrugs }