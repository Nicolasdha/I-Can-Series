const functions = require("firebase-functions");
const axios = require("axios");
var qs = require("qs");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51InSTbLFkWX2uXtIVmyMP9VdvfWR11IiGAkTxzdHtJ22wAoIk3FGx9WizSuUGU6uviVeIwTUH0HnNINoSHrLJ48800GHIMsM8r"
);

let bearerToken;

var corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5001"],
};

//API

// App config
const app = express();

// Middlewares

app.use(cors({ origin: true }));
app.use(express.json());

//API routes

app.post("/payments/create", async (req, res) => {
  const email = req.query.email;
  const total = req.query.total;
  console.log("Payment request received - ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    receipt_email: email,
  });
  console.log(paymentIntent);
  const paymentUpdate = await stripe.paymentIntents.update(paymentIntent.id, {
    receipt_email: email,
  });

  console.log(paymentIntent);
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/payments/sub/cancel", async (req, res) => {
  const { subscriptionId } = req.body;
  const deleteSub = await stripe.subscriptions.del(subscriptionId);

  // Need to delete sub from DB
  console.log("DELETED", deleteSub);
  const status = deleteSub["status"];
  res.status(200).send({ status });
});

app.post("/payments/sub", async (req, res) => {
  const { email, payment_method, name } = req.body;

  const customer = await stripe.customers.create({
    payment_method,
    email,
    name,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });
  console.log("THIS IS CUSTOMER", customer);
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: "price_1IpdjjLFkWX2uXtIFsROULtY" }],
    expand: ["latest_invoice.payment_intent"],
  });
  console.log("CREATED SUB", subscription);
  const status = subscription["latest_invoice"]["payment_intent"]["status"];
  const client_secret =
    subscription["latest_invoice"]["payment_intent"]["client_secret"];
  const paymentIntent = subscription["latest_invoice"]["payment_intent"]["id"];
  const amount = subscription["latest_invoice"]["payment_intent"]["amount"];
  const created = subscription["latest_invoice"]["payment_intent"]["created"];
  const subscriptionId = subscription["id"];

  res.json({
    client_secret,
    status,
    paymentIntent,
    amount,
    created,
    subscriptionId,
  });
});

app.post("/v1/oauth2/token/", cors(), async (req, res) => {
  var data = qs.stringify({
    grant_type: "client_credentials",
  });

  var config = {
    method: "post",
    url: "https://api-m.sandbox.paypal.com/v1/oauth2/token/",
    headers: {
      "Access-Control-Allow-Origin": "https://the-i-can-series.web.app/",
      Authorization:
        "Basic QWQwTXdHLTJ6SV9qRUdOeGNSOGx1ZkRGR3RyT1UwZEpXVnFLS3NaaHZ1cm91cFFaekZNSEJMaXVLMG1EbnpuNF9HYl9ibGJ3XzhYN3VhdEo6RU5SdWMwcU9iVlBUVDJlR01XUEFSeExndkJDSnRZaUlLd0RvckdaSjRUamJvdXZjWnR0dm9EbjA3MTQ2cFZWenIxeTFZZThzMjJDUGVrd2w=",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      // console.log(response);
      bearerToken = response.data.access_token;
      res.status(201).send(bearerToken);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/v2/checkout/orders/", cors(), async (req, res) => {
  console.log("yuuuup");

  var data = JSON.stringify({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "1900.00",
        },
      },
    ],
    application_context: {
      return_url: "http://localhost:3000/paymentComplete/",
    },
  });

  var config = {
    method: "post",
    url: "https://api-m.sandbox.paypal.com/v2/checkout/orders/",
    headers: {
      "Access-Control-Allow-Origin": "https://the-i-can-series.web.app/",
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    data: data,
  };

  const response = await axios(config);
  console.log(response.data);

  var config2 = {
    method: "get",
    url: response.data.links[1].href,
    headers: {
      "Access-Control-Allow-Origin": "https://the-i-can-series.web.app/",
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const response2 = await axios(config2);
  console.log("shittymcgrit", response2);
  res.redirect(response2.config.url);
  // console.log(res.config.url);
  res.status(200).send();
});

app.post(`/v2/checkout/orders/:id/capture/`, cors(), async (req, res) => {
  console.log("IN THIS BITCH");
  console.log("this da req", req);

  var data = JSON.stringify({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "1900.00",
        },
      },
    ],
  });

  var config = {
    method: "post",
    url: `https://api.sandbox.paypal.com/v2/checkout/orders/${req.params.id}/capture/`,
    headers: {
      "Access-Control-Allow-Origin": "https://the-i-can-series.web.app/",
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log("pikachu", response.data);
      res.status(201).send(response.data);
    })
    .catch(function (error) {
      console.log("shit piss ", error);
    });
});

// app.get("/v2/checkout/orders/approve", async (req, res) => {
//   console.log("fraggle");

//   var config = {
//     method: "get",
//     url: "https://www.sandbox.paypal.com/checkoutnow?token=4BA21055GK822494R",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${bearerToken}`,
//     },
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

// Listen command
exports.api = functions.https.onRequest(app);

// exports.api = functions.https.onRequest((request, response) => {
//   cors(request, response, () => {
//     return app;
//   });
// });

//To spin up express server and serve endpoint
// firebase emulators:start

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
