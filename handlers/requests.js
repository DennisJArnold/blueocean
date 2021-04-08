const axios = require("axios");

const server = "http://ec2-34-219-128-243.us-west-2.compute.amazonaws.com:4000";

const requests = {
  fetchUserEvents(user, cb) {
    axios
      .get(`/api/events/get-events-by-attendee/${user}`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  fetchAllEvents(cb) {
    axios
      .get(`/api/events/get-all-events`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  addUserToEvent(userId, eventId) {
    const updateObj = {
      user_id: userId,
      event_id: eventId,
    };
    axios
      .put(`/api/signup`, updateObj)
      .then((response) => {
        console.log(`Added User ${userId} to Event ${eventId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getUserProfile(email, cb) {
    axios
      .get(`/api/users/get-user-profile/${email}`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  addEvent(postObj) {
    axios
      .post(`/api/events/create-event`, postObj)
      .then((response) => {
        console.log('Added new event!', response);
      })
      .catch((err) => {
        console.log('err with event posting: ', err);
      });
  },
  fetchEventAttendees(eventID, cb) {
    axios
      .get(`/api/events/get-event-attendees/${eventID}`)
      .then((response) => {
        cb(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  },

};

module.exports = requests;
