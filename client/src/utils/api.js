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
  // Updates the user with the given email address
  updateUser: function (user) {
    console.log( "updateUser for " + user.email);
    return axios.put("/api/users/" + user.email, user);
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
  searchRooms: function (params) {
    return axios.get("/api/rooms", params);
  },
  searchRoomsByName: function (name) {
    return axios.get("/api/rooms/?roomName=" + name);
  },
  // single location
  getRoomsByLocation: function (location) {
    return axios.get("/api/rooms", { params: { locations: [location] }});
  },
  saveRoom: function (roomData) {
    return axios.post("/api/rooms", roomData);
  },
  deleteRoom: function (id) {
    return axios.delete("/api/rooms/" + id);
  },
  updateRoom: function (id, roomData) {
    return axios.put("/api/rooms/" + id, roomData);
  },
  getRoomCountPerLocation: function () {
    return axios.get("/api/rooms/count");
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
  deleteLocation: function (id) {
    return axios.delete("/api/locations/" + id);
  },

  // *** FEATURES ***
  saveFeature: function (featureData) {
    return axios.post("/api/features", featureData);
  },
  getFeatures: function () {
    return axios.get("/api/features");
  },
  getFeature: function (id) {
    return axios.get("/api/features/" + id);
  },
  updateFeature: function (id, featureData) {
    return axios.put("/api/features/" + id, featureData);
  },
  deleteFeature: function (id) {
    return axios.delete("/api/features/" + id);
  },
};