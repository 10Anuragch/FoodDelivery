import express from "express";

import Order from "../models/Orders.js";
import User from "../models/User.js";

import fetch from "../middleware/fetchdetails.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();


// ==========================================
// GET ALL ORDERS
// ==========================================

router.get("/orders", isAdmin, async (req, res) => {

  try {

    const orders = await Order.find({});

    res.json(orders);

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      error: "Server Error"
    });

  }

});


// ==========================================
// GET SINGLE ORDER
// ==========================================

router.get("/order/:email", isAdmin, async (req, res) => {

  try {

    const order = await Order.findOne({
      email: req.params.email
    });

    if (!order) {

      return res.status(404).json({
        error: "Order not found"
      });

    }

    res.json(order);

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      error: "Server Error"
    });

  }

});


// ==========================================
// UPDATE ORDER
// ==========================================

router.put("/order/:email", isAdmin, async (req, res) => {

  try {

    const updatedData = req.body.order_data;

    const order = await Order.findOneAndUpdate(

      {
        email: req.params.email
      },

      {
        $set: {
          order_data: updatedData
        }
      },

      {
        new: true
      }

    );

    if (!order) {

      return res.status(404).json({
        error: "Order not found"
      });

    }

    res.json({
      success: true,
      order
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      error: "Server Error"
    });

  }

});


// ==========================================
// DELETE ORDER
// ==========================================

router.delete("/order/:email", isAdmin, async (req, res) => {

  try {

    const order = await Order.findOneAndDelete({
      email: req.params.email
    });

    if (!order) {

      return res.status(404).json({
        error: "Order not found"
      });

    }

    res.json({
      success: true,
      message: "Order deleted successfully"
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      error: "Server Error"
    });

  }

});


// ==========================================
// GET ALL USERS
// ==========================================

router.get("/users", isAdmin, async (req, res) => {

  try {

    const users = await User.find({}).select("-password");

    res.json(users);

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      error: "Server Error"
    });

  }

});


// ==========================================
// GET SINGLE USER
// ==========================================

router.get("/user/:email", isAdmin, async (req, res) => {

  try {

    const user = await User.findOne({
      email: req.params.email
    }).select("-password");

    if (!user) {

      return res.status(404).json({
        error: "User not found"
      });

    }

    res.json(user);

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      error: "Server Error"
    });

  }

});


// ==========================================
// DELETE USER
// ==========================================

router.delete("/user/:email", isAdmin, async (req, res) => {

  try {

    const user = await User.findOneAndDelete({
      email: req.params.email
    });

    if (!user) {

      return res.status(404).json({
        error: "User not found"
      });

    }

    res.json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      error: "Server Error"
    });

  }

});

export default router;