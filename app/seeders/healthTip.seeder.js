const faker = require('faker');
const { randomInt } = require("@helpers/number.helper");

//models
const HealthTip = require("@models/HealthTip.model");

const seedHealthTips = async (req, res) => {

    const healthTipCount = parseInt(req.query.healthTipCount) || randomInt(1, 3);
    const healthTips = [];

    for( let count = 0; count < healthTipCount; count++){

        let healthTip = healthTipFactory();
        healthTips.push(healthTip);
    }

    HealthTip.collection.insert( healthTips, function (err, data) {
        if (err){ 
            
            res.status(400).json({
                success: false,
                message: "error generating and saving healthTips",
                data: err
            });

        } 
        else {
            res.status(201).json({
                success: "true",
                message: "healthTips generated and saved successfully",
                data: healthTips
            });
        }
    });  
}


const healthTipFactory =  () => {
    
    const healthTip = {
        
        tip: faker.lorem.sentence(),
        article: faker.lorem.paragraphs(),
        externalLink: faker.internet.url(),
        createdAt: new Date,
        updatedAt: new Date,
    }

    return healthTip;
}

module.exports = { seedHealthTips }