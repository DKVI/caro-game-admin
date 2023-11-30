import axios from "axios";

const instance = axios.create({
  baseURL: "https://game-caro-api.vercel.app/api/v1",
});

export default instance;
