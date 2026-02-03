
// // import express from "express";
// // import User from "../models/User.js";
// // import Order from "../models/Orders.js";
// // import { body, validationResult } from "express-validator";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import axios from "axios";
// // import fetch from "../middleware/fetchdetails.js";

// // const router = express.Router();
// // const jwtSecret = "HaHa";

// // router.post('/createuser', [
// //   body('email').isEmail(),
// //   body('password').isLength({ min: 8 }),
// //   body('name').isLength({ min: 3 })
// // ], async (req, res) => {
// //   let success = false;
// //   const errors = validationResult(req);
// //   if (!errors.isEmpty()) return res.status(400).json({ success, errors: errors.array() });

// //   try {
// //     const salt = await bcrypt.genSalt(10);
// //     const securePass = await bcrypt.hash(req.body.password, salt);

// //     const user = await User.create({
// //       name: req.body.name,
// //       password: securePass,
// //       email: req.body.email,
// //       location: req.body.location
// //     });

// //     const authToken = jwt.sign({ user: { id: user.id } }, jwtSecret);
// //     success = true;
// //     res.json({ success, authToken });

// //   } catch (error) {
// //     console.error(error);
// //     res.status(400).json({ error: "Please enter a unique value." });
// //   }
// // });

// // router.post('/login', [
// //   body('email').isEmail(),
// //   body('password').exists(),
// // ], async (req, res) => {
// //   let success = false;
// //   const errors = validationResult(req);
// //   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

// //   const { email, password } = req.body;
// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(400).json({ success, error: "Invalid credentials" });

// //     const pwdCompare = await bcrypt.compare(password, user.password);
// //     if (!pwdCompare) return res.status(400).json({ success, error: "Invalid credentials" });

// //     const authToken = jwt.sign({ user: { id: user.id } }, jwtSecret);
// //     success = true;
// //     res.json({ success, authToken });

// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).send("Server Error");
// //   }
// // });

// // router.post('/getuser', fetch, async (req, res) => {
// //   try {
// //     const user = await User.findById(req.user.id).select("-password");
// //     res.json(user);
// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).send("Server Error");
// //   }
// // });

// // router.post('/getlocation', async (req, res) => {
// //   try {
// //     const { lat, long } = req.body;
// //     if (!lat || !long) return res.status(400).json({ error: "Latitude and Longitude required" });

// //     const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=74c89b3be64946ac96d777d08b878d43`;
// //     const response = await axios.get(url);

// //     if (!response.data.results || response.data.results.length === 0)
// //       return res.status(404).json({ error: "No location found" });

// //     const { city = "", state = "", country = "" } = response.data.results[0].components;
// //     res.json({ location: `${city}, ${state}, ${country}` });

// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).json({ error: "Server Error" });
// //   }
// // });


// // router.post('/foodData', async (req, res) => {
// //   try {
// //     res.json([global.foodData, global.foodCategory]);
// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).send("Server Error");
// //   }

// //   // router.get('/foodData', async (req, res) => {
// //   //   try{
// //   //     const maxPrice=parseInt(req.query.maxPrice) || 1000;
// //   //   const filter={price:{$lte:maxPrice}};
// //   //   const foodItems=await FoodItem.find(filter);
// //   //   res.json(foodItems);
// //   //   }catch(error){
// //   //     console.error(error.message);
// //   //     res.status(500).send("Server Error")
// //   //   }
// // });

// // router.post('/orderData', async (req, res) => {
// //   const data = req.body.order_data;
// //   data.splice(0, 0, { Order_date: req.body.order_date });

// //   try {
// //     const eId = await Order.findOne({ email: req.body.email });
// //     if (!eId) {
// //       await Order.create({ email: req.body.email, order_data: [data] });
// //     } else {
// //       await Order.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } });
// //     }
// //     res.json({ success: true });
// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).send("Server Error");
// //   }
// // });

// // router.post('/myOrderData', async (req, res) => {
// //   try {
// //     const eId = await Order.findOne({ email: req.body.email });
// //     res.json({ orderData: eId });
// //   } catch (error) {
// //     console.error(error.message);
// //     res.status(500).send("Server Error");
// //   }
// // });

// // export default router;


// import express from "express";
// import User from "../models/User.js";
// import { body, validationResult } from "express-validator";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";

// const router = express.Router();
// const jwtSecret = "HaHa"; // Use env variable in production

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "2072anuragchauhan@gmail.com", // Your Gmail
//     pass: "uxoxobbwehgzrinl",           // App Password
//   },
// });

// // ------------------- CREATE USER -------------------
// router.post(
//   "/createuser",
//   [
//     body("email").isEmail(),
//     body("password").isLength({ min: 8 }),
//     body("name").isLength({ min: 3 }),
//   ],
//   async (req, res) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty())
//       return res.status(400).json({ success, errors: errors.array() });

//     try {
//       // Check if user already exists
//       const existingUser = await User.findOne({ email: req.body.email });
//       if (existingUser)
//         return res
//           .status(400)
//           .json({ success, error: "User with this email already exists." });

//       // Hash password
//       const salt = await bcrypt.genSalt(10);
//       const securePass = await bcrypt.hash(req.body.password, salt);

//       // Generate OTP
//       const otp = Math.floor(100000 + Math.random() * 900000);

//       // Create user with OTP
//       const user = await User.create({
//         name: req.body.name,
//         password: securePass,
//         email: req.body.email,
//         location: req.body.location,
//         isVerified: false,
//         otp,
//         otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
//       });

//       // Send OTP to the email entered by the user
//       const mailOptions = {
//         from: "2072anuragchauhan@gmail.com",
//         to: req.body.email, // <-- This is the user's email
//         subject: "Verify Your goFood Account",
//         text: `Hello ${req.body.name},\n\nYour OTP for goFood account verification is: ${otp}\nThis OTP is valid for 10 minutes.\n\nThank you!`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.error(error);
//           return res
//             .status(500)
//             .json({ success: false, error: "Failed to send OTP email" });
//         }
//         console.log("OTP sent: " + info.response);
//         success = true;
//         res.json({ success, message: "OTP sent to your email" });
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, error: "Server Error" });
//     }
//   }
// );

// // ------------------- VERIFY OTP -------------------
// router.post("/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ success: false, error: "User not found" });

//     if (user.isVerified)
//       return res
//         .status(400)
//         .json({ success: false, error: "User already verified" });

//     if (user.otp !== parseInt(otp))
//       return res.status(400).json({ success: false, error: "Invalid OTP" });

//     if (user.otpExpires < Date.now())
//       return res.status(400).json({ success: false, error: "OTP expired" });

//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     res.json({ success: true, message: "Email verified successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: "Server Error" });
//   }
// });

// // ------------------- LOGIN -------------------
// router.post(
//   "/login",
//   [
//     body("email").isEmail(),
//     body("password").exists(),
//   ],
//   async (req, res) => {
//     let success = false;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     const { email, password } = req.body;
//     try {
//       const user = await User.findOne({ email });
//       if (!user)
//         return res.status(400).json({ success, error: "Invalid credentials" });

//       const pwdCompare = await bcrypt.compare(password, user.password);
//       if (!pwdCompare)
//         return res.status(400).json({ success, error: "Invalid credentials" });

//       if (!user.isVerified)
//         return res
//           .status(400)
//           .json({ success, error: "Please verify your email before logging in." });

//       const authToken = jwt.sign({ user: { id: user.id } }, jwtSecret);
//       success = true;
//       res.json({ success, authToken });
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

// export default router;



import express from "express";
import User from "../models/User.js";
import Order from "../models/Orders.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import nodemailer from "nodemailer";
import fetch from "../middleware/fetchdetails.js";

const router = express.Router();
const jwtSecret = "HaHa"; // Use env variable in production

// ------------------- Nodemailer -------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "2072anuragchauhan@gmail.com", // Replace with your Gmail
    pass: "uxoxobbwehgzrinl",           // Gmail app password
  },
});

// ------------------- CREATE USER -------------------
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success, errors: errors.array() });

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser)
        return res
          .status(400)
          .json({ success, error: "User with this email already exists." });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Create user with OTP
      const user = await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
        location: req.body.location,
        isVerified: false,
        otp,
        otpExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
      });

      // Send OTP to the user's email
      const mailOptions = {
        from: "2072anuragchauhan@gmail.com",
        to: req.body.email,
        subject: "Verify Your goFood Account",
        text: `Hello ${req.body.name},\n\nYour OTP for goFood account verification is: ${otp}\nThis OTP is valid for 10 minutes.\n\nThank you!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ success: false, error: "Failed to send OTP email" });
        }
        console.log("OTP sent: " + info.response);
        success = true;
        res.json({ success, message: "OTP sent to your email" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
);

// ------------------- VERIFY OTP -------------------
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, error: "User not found" });

    if (user.isVerified)
      return res
        .status(400)
        .json({ success: false, error: "User already verified" });

    if (user.otp !== parseInt(otp))
      return res.status(400).json({ success: false, error: "Invalid OTP" });

    if (user.otpExpires < Date.now())
      return res.status(400).json({ success: false, error: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ success: true, message: "Email verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// ------------------- LOGIN -------------------
router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ success, error: "Invalid credentials" });

      const pwdCompare = await bcrypt.compare(password, user.password);
      if (!pwdCompare)
        return res.status(400).json({ success, error: "Invalid credentials" });

      if (!user.isVerified)
        return res
          .status(400)
          .json({ success, error: "Please verify your email before logging in." });

      const authToken = jwt.sign({ user: { id: user.id } }, jwtSecret);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// ------------------- GET USER DETAILS -------------------
router.post("/getuser", fetch, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// ------------------- GET LOCATION -------------------
router.post("/getlocation", async (req, res) => {
  try {
    const { lat, long } = req.body;
    if (!lat || !long) return res.status(400).json({ error: "Latitude and Longitude required" });

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=74c89b3be64946ac96d777d08b878d43`;
    const response = await axios.get(url);

    if (!response.data.results || response.data.results.length === 0)
      return res.status(404).json({ error: "No location found" });

    const { city = "", state = "", country = "" } = response.data.results[0].components;
    res.json({ location: `${city}, ${state}, ${country}` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// ------------------- FOOD DATA -------------------
// Initialize some sample food items globally
if (!global.foodData) {
  global.foodData = [
    { id: 1, name: "Pizza", category: "Fast Food", price: 250, img: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg" },
    { id: 2, name: "Burger", category: "Fast Food", price: 150, img: "https://images.pexels.com/photos/1639566/pexels-photo-1639566.jpeg" },
    { id: 3, name: "Cake", category: "Dessert", price: 300, img: "https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg" },
  ];
}

if (!global.foodCategory) {
  global.foodCategory = ["Fast Food", "Dessert", "Beverages"];
}

router.post("/foodData", async (req, res) => {
  try {
    res.json([global.foodData, global.foodCategory]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// ------------------- ORDER DATA -------------------
router.post("/orderData", async (req, res) => {
  const data = req.body.order_data;
  data.splice(0, 0, { Order_date: req.body.order_date });

  try {
    const eId = await Order.findOne({ email: req.body.email });
    if (!eId) {
      await Order.create({ email: req.body.email, order_data: [data] });
    } else {
      await Order.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } });
    }
    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// ------------------- MY ORDER DATA -------------------
router.post("/myOrderData", async (req, res) => {
  try {
    const eId = await Order.findOne({ email: req.body.email });
    res.json({ orderData: eId });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
