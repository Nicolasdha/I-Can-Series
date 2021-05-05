const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51InSTbLFkWX2uXtIVmyMP9VdvfWR11IiGAkTxzdHtJ22wAoIk3FGx9WizSuUGU6uviVeIwTUH0HnNINoSHrLJ48800GHIMsM8r"
);

//API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (req, res) => res.status(200).send("hellow! world"));
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Payment request received - ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);

//To spin up express server and serve endpoint
// firebase emulators:start

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
