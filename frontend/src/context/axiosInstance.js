import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-gateway-107202934169.us-central1.run.app/",
});

instance?.interceptors?.request?.use(
  async (config) => {
    const bearerToken = sessionStorage.getItem("token");
    if (bearerToken) {
      config.headers["Authorization"] = `Bearer ${bearerToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
