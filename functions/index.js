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

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5001");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

app.use(allowCrossDomain);
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
    receipt_email: "sankp001@gmail.com",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
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

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: "price_1Ip0dULFkWX2uXtIJ4lvzYA0" }],
    expand: ["latest_invoice.payment_intent"],
  });
  const status = subscription["latest_invoice"]["payment_intent"]["status"];
  const client_secret =
    subscription["latest_invoice"]["payment_intent"]["client_secret"];

  res.json({
    client_secret: client_secret,
    status: status,
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
