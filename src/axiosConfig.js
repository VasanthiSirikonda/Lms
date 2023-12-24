import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:9092/",
});
axiosConfig.defaults.headers.common["Authorization"] = sessionStorage.getItem(
  "token"
)
  ? "Bearer " + sessionStorage.getItem("token")
  : "";
axiosConfig.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default axiosConfig;