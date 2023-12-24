import axios from "../axiosConfig";

export const readPostmortemExcelFile = async (formData) => {
  return await axios.post("api/readPostmortemExcelFile", formData);
};

export const getPostmortems = async (key) => {
  return await axios.get("api/getPostmortems?key=" + key);
};

export const saveSearchHistory = async (key) => {
  return await axios.post("api/saveSearchHistory" , {searchKey:key});
};


export const getSearchHistory = async () => {
  return await axios.get("api/getSearchHistory");
};




