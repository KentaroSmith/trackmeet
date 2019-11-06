import axios from "axios";

export default {

    //going to use the params from the search page to narrow down the room results
    searchRooms: function (query) {
        return axios.get("/api/rooms", { params: { q: query } });
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