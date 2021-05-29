import axios from "axios";

const instance = axios.create({
  headers: {
    "Access-Control-Allow-Origin":
      "https://the-i-can-series.web.app, https://the-i-can-series.web.app, https://www.sandbox.paypal.com, https://us-central1-the-i-can-series.cloudfunctions.net, http://localhost:3000, http://localhost:3000/, http://localhost:5001/localhost:5001",
    "Access-Control-Allow-Headers": "Authorization",
  },
  baseURL: "http://localhost:5001/the-i-can-series/us-central1/api", //URL of API,
});

export default instance;

// Local API Endpoint
// http://localhost:5001/the-i-can-series/us-central1/api
// https://us-central1-the-i-can-series.cloudfunctions.net/api

// headers: {
//   "Access-Control-Allow-Origin":
//     "https://the-i-can-series.web.app, https://the-i-can-series.web.app, https://www.sandbox.paypal.com, https://us-central1-the-i-can-series.cloudfunctions.net, http://localhost:3000, http://localhost:3000/, http://localhost:5001/the-i-can-series/us-central1/api/v1/oauth2/token",
//   "Access-Control-Allow-Headers": "Authorization",
// },
