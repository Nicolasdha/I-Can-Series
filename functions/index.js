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
