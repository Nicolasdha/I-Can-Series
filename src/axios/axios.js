import axios from "axios";

const instance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "https://the-i-can-series.web.app",
    "Access-Control-Allow-Headers": "https://the-i-can-series.web.app",
  },
  baseURL: "https://us-central1-the-i-can-series.cloudfunctions.net/api", //URL of API,
});

export default instance;

// Local API Endpoint
// http://localhost:5001/the-i-can-series/us-central1/api
// https://us-central1-the-i-can-series.cloudfunctions.net/api
