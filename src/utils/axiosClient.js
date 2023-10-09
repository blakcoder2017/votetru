import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthHeader = (token) => {
  instance.defaults.headers.common["Authorization"] = `${token}`;
};

instance.interceptors.response.use(
  function (response) {
    if (response.data) {
      // return success
      if (response.status === 200 || response.status === 201) {
        return response;
      }
      // reject errors & warnings
      return Promise.reject(response);
    }

    // default fallback
    return Promise.reject(response);
  },
  function (error) {
    // if the server throws an error (404, 500 etc.)
    return Promise.reject(error);
  }
);

export default instance;
