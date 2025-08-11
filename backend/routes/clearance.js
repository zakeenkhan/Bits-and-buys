import express from "express";
import {
  getClearanceItems,
  addToCart,
  getCartItems,
  checkout,
} from "../controllers/clearanceController.js"; // 

const router = express.Router();

router.get("/", getClearanceItems);
router.post("/add-to-cart", addToCart);
router.get("/cart", getCartItems);
router.post("/checkout", checkout);

export default router;
