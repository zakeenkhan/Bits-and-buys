// routes/offerRoutes.js
import express from "express";
import {
  getSummerMenOffers,
  getSummerWomenOffers,
  getSummerKidsOffers,
  getClearanceOffers,
  getBundleOffer,
  getBOGOOffer, 
} from "../controllers/offerController.js";

const router = express.Router();

router.get("/men", getSummerMenOffers);
router.get("/women", getSummerWomenOffers);
router.get("/kids", getSummerKidsOffers);
router.get("/clearance-items", getClearanceOffers);
router.get("/bundle", getBundleOffer);
router.get("/bogo", getBOGOOffer); 

export default router;
