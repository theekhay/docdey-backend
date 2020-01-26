const Appointment = require('@models/Appointment.model');

module.exports = {

    /**
     * returns all events given certain parameters
     * @param query object 
     * @param options object
     */
    all: async ( query = {}, options = {} ) =>{

        //const {limit, sort} =  options;
        query["deletedAt"] = null;
        let events = await Appointment.find(query);
        return events;
    },


    /**
     * creates a new appointment
     * @param appointmentData object
     */
    createAppointment: async (appointmentData ) =>{

        let appointment = new Appointment(appointmentData);
        let result = await appointment.save(); 
        return result; 
    },


    /**
     * returns a single instance of an appointment
     * @param appointmentId String
     */
    viewAppointment: async (appointmentId) => {

        let appointment = await Appointment.findById(appointmentId);
        return appointment;
    },


    /**
     * update a single appointment instance
     * @param appointmentId integer
     * @param updateData 
     */
    updateAppointment: async (appointmentId, updateData) => {

        const result = await Appointment.findByIdAndUpdate( appointmentId, updateData, {new: true});
        return result;
    },


    /**
     * update a set of a single appointment model
     * @param appointmentId String 
     * @param update object
     * 
     */
    updateAppointmentSet: async (appointmentId, setData) => {

        return await Appointment.findByIdAndUpdate( { _id: appointmentId } , { '$addToSet': setData });
    },


    /**
     * performs a softDelete operation on a single instance of a model
     * @param appointmentId integer
     *
     */
    softDeleteAppointment: async (appointmentId) => {

        const updateData = {deletedAt: Date.now(), deletedBy: '1edfhuio3ifj'};
        return await module.exports.updateAppointment(appointmentId, updateData);  
    },


    /**
     * updates an appointment instance -  addsa a new audit history to the appointment document
     * @param appointmentId String - the unique identifier of the appointment.
     * @param appointment string - the name of the appointment e.g create, delete etc.
     */
    addAppointmentHistory: async (appointmentId, appointment) => {

        let history  = {
            appointment,
            createdAt: new Date(),
            comment: "new appointment history",
            userId: "o098uyhjk"
        };

        let set = { 'history': history };

        return await module.exports.updateAppointmentSet(appointmentId, set);
    },


    /**
     * updates an appointment controls - controls are like dos/donts of an appointment (bad explanation, but you get the point)
     * e.g "no-pets" could be an appointment control - if the owners of an appointment do not want pets at their appointment
     * @param appointmentId String - the unique identifier of the appointment.
     * @param controlName string - the name of the appointment e.g create, delete etc.
     */
    addAppointmentControl: async (appointmentId, controlName) => {

        let control  = {
            name: controlName,
            createdAt: new Date(),
            createdBy: "kgmkgmgkg"
        };

        let set = { 'controls': control };

        return await module.exports.updateAppointmentSet(appointmentId, set);

    },

    
    /**
     * check if a user is followiig an appointment
     * 
     * @param appointmentId string
     * @param userId string
     * 
     * @return boolean
     */
    isFollowingAppointment: async (appointmentId, userId) => {

        let appointment = await Appointment.findOne({ _id: appointmentId, 'followers.userId': userId });
        return appointment ? true : false;
    },


    /**
     * unsubsribes a user from an appointment
     * the user no longer gets notifications of happenings on that appointment. 
     * @param appointmentId string
     * @param userId string
     */
    unfollowAppointment: async (appointmentId, userId) => {

        let update = await Appointment.findByIdAndUpdate( appointmentId, { $pull: { 'followers':  {"userId": userId }  } }, 
        { new: true} );
        return update;
    },


    /**
     * disables a users from getting notifications about an appointment
     * even if the user is following the appointment
     * 
     * @param appointmentId String
     * @param userId String
     */
    muteAppointmentNotification: async ( appointmentId, userId ) => {

        return await Appointment.findOneAndUpdate( { _id: appointmentId, "followers.userId": userId }, { $set : { 'followers.$.allowNoifications' : false }}, { runValidators: true } );  
    },


    /**
     * checks if a user is an admin for an appointment 
     * @param appointmentId String
     * @param email|userid String <---- still need to decide the better option/approach ( consider case where I want to add somone
     * as a coordinator but who is not yet signed on the platform - do I enforce they sign up or allow them just use their email without a need 
     * to sign up)
     * 
     * @returns boolean
     */
    isAppointmentAdmin: async (appointmentId, userId) => {

        let appointment = await Appointment.findOne({ _id: appointmentId, 'coordinators.email': emai });
        return appointment ? true : false;
    },


    /**
     * Generates the invite link for an appointment
     * @param appointmentId String
     * 
     */
    generateInviteLink: async( appointmentId ) => {

        const baseUrl = process.env.baseUrl;
        const appointment = module.exports.viewAppointment(appointmentId);
        let link = `${baseUrl}/appointment/invite/${appointment.uuid}`;
        return link
    },


    /**
     * Basically confirms that a user would be attending an appointment
     * updates a user attending status to 'YES' for an appointment
     * @param appointmentId String
     * @param userId String
     * @param status String - "YES", "NO", "MAYBE" are the only allwed values
     * 
     */
    confirmAppointmentAttendance: async( appointmentId, userId, status ) => {

        return await Appointment.findOneAndUpdate( { _id: appointmentId, "invitees.userId": userId }, { $set : { 'invitees.$.accepted' : status }}, { runValidators: true } );
    },


    /**
     * add new invitees to an appointment
     * @param appointmentId String
     * @param invitees array
     */
    addInvitees: async( appointmentId, invitees = [] ) => {

        await Appointment.bulkWrite(

            payload.map( data => 
              ({
                updateOne: {
                  filter: { '_id': 'appointmentId', 'invitees.userId' : { $ne: data.key } },
                  update: { $push: { invitees: data } }
                }
              })
            )
        )
    },


    /**
     * Remove an invitee from an appointment.
     * @param appointmentId string
     * @param userId string - this could later be the user's email, yet to decide
     */
    removeInvitees: async( appointmentId, userId ) => {

        let update = await Appointment.findByIdAndUpdate( appointmentId, { $pull: { 'invitees':  { "userId": userId }  } }, 
        { new: true} );
        return update;
    },


    /**
     * adds an appointment to a user's google calendar
     * when a user creates an appointment | likes an appointment | follows an appointment - the appointment gets added to their google calendar
     * @param appointmentId
     */
    googleCalendarIntegration: async( appointmentId ) => {

    }
}