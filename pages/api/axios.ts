import axios from "axios";

const instance = axios.create({
  baseURL: "https://bootcamp-api.codeit.kr/api/2-4/the-julge/",
  headers: {
    "Content-type": "application/json",
  },
  // withCredentials: true,
});

export default instance;
