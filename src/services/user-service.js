import axios from "../axiosConfig";

export const getUsersData = async () => {
  return await axios.get("api/users");
};

export const addUser = async (data) => {
  return await axios.post("/api/addUser", data);
};

export const updateUser = async (user) => {
  return await axios.put("/api/updateUser", user);
};

export const deleteUserApi = async (id) => {
  return await axios.delete("/api/deleteUser/" + id);
};

export const aproveUser = async (userData) => {
  return await axios.get(
    "approve?groupId=" +
      userData.groupId +
      "&username=" +
      userData.username +
      "&role=" +
      userData.role +
      "&reason=" +
      userData.reason
  );
};

export const rejectAuser = async (userData) => {
  return await axios.get(
    "reject?username=" + userData.username + "&reason=" + userData.reason
  );
};

export const getDepartments = async () => {
  return await axios.get("/api/getDepartments");
};
