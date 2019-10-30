import axios from "axios";

export default {
  // Gets all Users in local database
  getUsers: function () {
    return axios.get("/api/users");
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
  }
};
