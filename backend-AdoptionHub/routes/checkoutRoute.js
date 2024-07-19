const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = require("express").Router();

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { products } = req.body;
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.productName,
          images: [product.productImageUrl],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
