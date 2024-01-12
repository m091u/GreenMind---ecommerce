const dotenv = require("dotenv");
const router = require("express").Router();
dotenv.config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", (req, res) => {
  
  let line_items = req.body.cartProducts.map((item) => {
    
    const price = parseFloat(item.price);
    if (isNaN(price)) {
      return null;
    }
    const unitAmountCents = Math.round(price * 100); 

    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: unitAmountCents,
      },
      quantity: item.quantity,
    };
  });

  stripe.checkout.sessions
    .create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}success`,
      cancel_url: `${process.env.CLIENT_URL}cart`,
    })
    .then((session) => {
      res.send({ url: session.url });
    })
    .catch((error) => {
      console.error('Error creating checkout session:', error.message);
      res.status(500).json({ error: 'Error creating checkout session' });
    });
});

module.exports = router;
