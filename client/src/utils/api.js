import axios from "axios";

export default {

  // *** USERS ***
  // Gets all Users in local database
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Gets the user with the given email address
  getUser: function (email) {
    return axios.get("/api/users/?email=" + email);
  },
  // Deletes the User with the given id
  deleteUser: function (id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a User to the database
  saveUser: function (UserData) {
    console.log("saveUser function");
    console.log(UserData);
    return axios.post("/api/users", UserData);
  },

  // *** ROOMS ***
  searchRooms: function (query) {
    return axios.get("/api/rooms", query);
  },
  searchRoomsByName: function (name) {
    return axios.get("/api/rooms/?roomName=" + name);
  },
  searchRoomsByFeature: function (features) {
    return axios.get("/api/rooms/?features=" + features);
  },
  getRoomsByLocation: function (location) {
    return axios.get("/api/rooms/?location=" + location);
  },
  saveRoom: function (roomData) {
    return axios.post("/api/rooms", roomData);
  },

  // *** EVENTS ***
  saveEvent: function (eventData) {
    return axios.post("/api/events", eventData);
  },
  getEvents: function () {
    return axios.get("/api/events");
  },
  getEventsByUser: function (userId) {
    return axios.get("/api/events/?user=" + userId);
  },
  deleteEvent: function (id) {
    return axios.delete("/api/events/" + id);
  },

  // *** LOCATIONS ***
  saveLocation: function (locationData) {
    return axios.post("/api/locations", locationData);
  },
  getLocations: function () {
    return axios.get("/api/locations");
  },
  getLocation: function (id) {
    return axios.get("/api/locations/" + id);
  },
  updateLocation: function (id, locationData) {
    console.log("before");
    console.log(id);
    console.log(locationData);
    console.log("after");
    return axios.put("/api/locations/" + id, locationData);
  },

  // *** FEATURES ***
  saveFeature: function (featureData) {
    return axios.post("/api/features", featureData);
  },
  getFeatures: function () {
    return axios.get("/api/features");
  }
};