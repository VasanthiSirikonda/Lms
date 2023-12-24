import axios from "../axiosConfig";

export const getBooksData = async () => {
  return await axios.get("api/books");
};

export const addBook = async (data) => {
  return await axios.post("/api/addBook", data);
};

export const updateBook = async (book) => {
  return await axios.put("/api/updateBook", book);
};

export const deleteBookApi = async (id) => {
  return await axios.delete("/api/deleteBook/" + id);
};

export const approveBook = async (bookData) => {
  return await axios.get(
    "approve?groupId=" +
      bookData.groupId +
      "&bookname=" +
      bookData.bookname +
      "&role=" +
      bookData.role +
      "&reason=" +
      bookData.reason
  );
};

export const rejectBook = async (bookData) => {
  return await axios.get(
    "reject?bookname=" + bookData.bookname + "&reason=" + bookData.reason
  );
};

export const getGenres = async () => {
  return await axios.get("/api/getGenres");
};
