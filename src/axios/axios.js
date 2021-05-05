import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/the-i-can-series/us-central1/api", //URL of API,
});

export default instance;

// Local API Endpoint
// http://localhost:5001/the-i-can-series/us-central1/api
