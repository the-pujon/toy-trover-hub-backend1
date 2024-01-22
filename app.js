const express = require("express");
const cors = require("cors");
require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const toyRouter = require("./src/routes/toy.routes");
const paymentsRouter = require("./src/routes/payment.routes");
const ordersRouter = require("./src/routes/order.routes");
const bodyParser = require("body-parser");

const app = express();
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/toys", toyRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/orders", ordersRouter);

const Order = require("./src/model/order.schema");
const Payment = require("./src/model/payment.schema");
const User = require("./src/model/user.schema");

//stripe code

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// checkout api
app.post("/api/checkout", async (req, res) => {
  res.header("Access-Control-Allow-Origin", `${process.env.FRONTEND_URL}`);
  res.header("Access-Control-Allow-Credentials", true);

  //console.log(req.body)

  const {
    products,
    totalItem,
    totalPrice: total,
    shippingDetails,
    email,
  } = req.body;

  const singleUser = await User.findOne({ email: email })

  const singleUserId = singleUser._id.toString()

  console.log(singleUserId)

  const Orders = new Order({
    userEmail: email,
    userId: singleUserId,
    products,
    shippingDetails,
    totalItem,
    totalAmount: total,
  });

  console.log(Orders);

  await Orders.save();

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: parseInt(product.total * 100),
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/paymentSuccess/${Orders._id}`,
    cancel_url: `${process.env.FRONTEND_URL}`,
  });

  console.log(session);

  const transaction = new Payment({
    userId: singleUserId,
    orderId: Orders._id,
    sessionId: session.id,
    email: singleUser.email
  })

  await transaction.save();
  res.json({ id: session.id });
});

//app.post(
//  "/webhook",
//  bodyParser.raw({ type: "application/json" }),
//  async (request, response) => {
//    const payload = request.body;
//    const sig = request.headers["stripe-signature"];
//    const payloadString = JSON.stringify(payload, null, 2);
//    const secret = process.env.STRIPE_ENDPOINT_SECRET;
//    const header = stripe.webhooks.generateTestHeaderString({
//      payload: payloadString,
//      secret,
//    });

//    try {
//      const event = stripe.webhooks.constructEvent(
//        payloadString,
//        header,
//        secret
//      );

//      switch (event.type) {
//        case "checkout.session.completed":
//          const checkoutSessionCompleted = event.data.object;
//          await paymentSchema.findOneAndUpdate(
//            { sessionId: checkoutSessionCompleted.id },
//            { $set: { paymentStatus: checkoutSessionCompleted.payment_status } }
//          );
//          break;
//        default:
//          // Unexpected event type
//          console.log(`Unhandled event type ${event.type}.`);
//      }

//      response.status(200).send();
//    } catch (err) {
//      console.error("Error verifying webhook signature:", err.message);
//      response.status(400).send("Webhook Error: Invalid signature");
//    }

//    response.send();
//  }
//);

//Home page
app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/src/view/index.html");
  //res.send({mes:"working"})
});

//route not found error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});

//handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something broke",
  });
});

module.exports = app;
