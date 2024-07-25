const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Stripe = require("stripe");
const path = require("path");

const app = express();
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../client/build");
app.use(express.static(buildPath));
app.use(cors(
  {
    origin:'http://13.239.38.49:8080',
    credentials:true
  }
));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 8080;

// mongodb connection

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

//Schema

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    Unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});
const UserModel = mongoose.model("user", userSchema);

//product Schema
const productSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

const ProductModel = mongoose.model("product", productSchema);

app.get("/", (req, res) => {
  res.sendFile(
    path.join(_dirname,"../client/build/index.html"),
    function(err)
    {
      if(err)
      {
        res.status(500).send(err)
      }
    }
  )
 
});

//signup API
app.post("/signUp", async (req, res) => {
  const { email } = req.body;
  const alreadySignUp = await UserModel.findOne({ email });
  if (alreadySignUp) {
    res.send({
      message: "Email already registerd",
      error: true,
      success: false,
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const data = await UserModel({
      ...req.body,
      password: hashPassword,
    });
    const save = data.save();
    res.send({
      message: "User signedUp Successfully",
      success: true,
      error: false,
    });
  }
});

//Login API

app.post("/login", async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
    _id: user._id,
  };
  if (user) {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      res.send({
        message: "Login success",
        data: payload,
        success: true,
        error: false,
      });
    } else {
      res.send({
        message: "Incorrect password",
        success: false,
        error: true,
      });
    }
  } else {
    res.send({
      message: "User not found",
      success: false,
      error: true,
    });
  }
});

//Save product API

app.post("/uploadProduct", async (req, res) => {
  const data = await ProductModel(req.body);
  const dataSave = await data.save();

  res.send({
    message: "upload Successfully",
  });
});

//get products
app.get("/products", async (req, res) => {
  const data = await ProductModel.find({});
  res.send(JSON.stringify(data));
});

//console.log(process.env.STRIPE_SECRET_KEY)
// payment gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post("/checkout", async (req, res) => {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1Pb2DCGaXbsHDA1r5ZPAClBJ" }],

      line_items: req.body.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.name,
              // images : [item.image]
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.qty,
        };
      }),

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    // console.log(session)
    res.status(200).json(session.id);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.listen(PORT, () => {
  console.log("server is running at" + PORT);
});
