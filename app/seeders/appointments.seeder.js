const faker = require('faker');
const { randomInt } = require("@helpers/number.helper");

const appointmentCategory = ["birthday", "cooperate", "wedding", "house party", "sports"];

//models
const Appointment = require("@models/Appointment.model");


const seedAppointments = async (req, res) => {

    appointmentCode =  [];

    const appointmentCount = parseInt(req.query.appointmentCount) || randomInt(1, 3);
    const appointments = [];

    for( let count = 0; count < appointmentCount; count++){

        let appointment = appointmentFactory();
        appointments.push(appointment);
    }

    Appointment.collection.insert( appointments, function (err, data) {
        if (err){ 
            
            res.status(400).json({
                success: false,
                message: "error generating and saving appointments",
                data: err
            });

        } 
        else {
            res.status(201).json({
                success: "true",
                message: "appointments generated and saved successfully",
                data: appointments
            });
        }
    });  
}


const appointmentFactory =  () => {

    const patient = {
        name: faker.lorem.word(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber()
    }

    const specialist = {
        id: "96567890",
        name: "Dr. test sessus"
    }
    
    const appointment = {

        condition: faker.lorem.word(),
        date: faker.date.future(),
        startTime: "12;12",
        endTime: "01:12",
        patient: patient,
        specialist: specialist,
        uuid: faker.random.uuid(),
        appointmentDate: faker.date.future(),
        createdAt: new Date,
        updatedAt: new Date,
    }

    return appointment;
}

module.exports = { seedAppointments }