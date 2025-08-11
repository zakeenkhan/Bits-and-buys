import pool from "../config/db.js";

// Common handler for all offer types
const getOfferByType = async (type, res) => {
  try {
    // 1. First get the offer record by type
    const offerResult = await pool.query(
      `SELECT * FROM offers WHERE type = $1 AND is_active = true LIMIT 1`,
      [type]
    );

    if (offerResult.rows.length === 0) {
      return res.status(404).json({ error: `No ${type} offer found.` });
    }

    const offer = offerResult.rows[0];
    const productIds = offer.product_ids;

    // 2. Then get products using the product_ids from the offer
    const productResult = await pool.query(
      `SELECT * FROM products WHERE id = ANY($1::int[])`,
      [productIds]
    );

    const items = productResult.rows.map((product) => {
      const isFree = offer.type === "bogo" && product.id === 37; // You define the free product
      const discountedPrice = isFree
        ? 0
        : (parseFloat(product.price) * (1 - offer.discount_percentage / 100)).toFixed(2);

      return {
        item_id: product.id,
        name: product.name,
        price: discountedPrice,
        old_price: product.price,
        image: product.image,
        title: offer.title,
        description: offer.description,
        discount_percentage: offer.discount_percentage,
      };
    });

    res.json(items);
  } catch (err) {
    console.error(`🔥 ${type} Offer Fetch Error:`, err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export handlers for each offer type
export const getSummerMenOffers = (req, res) => getOfferByType("summer-men", res);
export const getSummerWomenOffers = (req, res) => getOfferByType("summer-women", res);
export const getSummerKidsOffers = (req, res) => getOfferByType("summer-kids", res);
export const getClearanceOffers = (req, res) => getOfferByType("clearance-items", res);
export const getBundleOffer = (req, res) => getOfferByType("bundle", res);
export const getBOGOOffer = (req, res) => getOfferByType("bogo", res);
