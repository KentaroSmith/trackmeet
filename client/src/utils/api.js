import axios from "axios";

export default {

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

  //going to use the params from the search page to narrow down the room results
  searchRooms: function (query) {
    return axios.get("/api/rooms", query);
  },
  searchRoomsByLocation: function (location) {
    return axios.get("/api/rooms/?roomName=" + location)
  },
  searchRoomsByFeature: function (features) {
    return axios.get("/api/rooms/?features=" + features)
  },
  getEvents: function () {
    return axios.get("/api/events")
  }
};