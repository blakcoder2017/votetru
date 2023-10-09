import axios, { setAuthHeader } from "../utils/axiosClient";

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    try {
      return await axios.get(`${this.baseURL}${path}`);
    } catch (e) {
      throw Error(e.message);
    }
  }

  async post(path, data) {
    try {
      const res = await axios.post(`${this.baseURL}${path}`, data);
      return res.data;
    } catch (e) {
      return e;
    }
  }

  async patch(path, data) {
    try {
      const res = await axios.patch(`${this.baseURL}${path}`, data);
      return res.data;
    } catch (e) {
      return e;
    }
  }

  async put(path, data) {
    throw Error("Unimplemented Error");
  }

  async delete(path) {
    throw Error("Unimplemented Error");
  }
}

export default ApiService;
