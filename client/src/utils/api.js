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
  searchEvents: function (query) {
    return axios.get("api/events", query)
  },
  /* // Gets all books in local database
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    //console.log("saveBook function");
    //console.log(bookData);
    return axios.post("/api/books", bookData); 
  }*/
};