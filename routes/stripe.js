
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", async (req, res) => {
  // console.log(req.body)
  // stripe.charges.create(
  //   {
  //     source: req.body.tokenId,
  //     amount: req.body.amount,
  //     currency: "usd",
  //   },
  //   (stripeErr, stripeRes) => {
  //     if (stripeErr) {
  //       res.status(500).json(stripeErr);
  //     } else {
  //       res.status(200).json(stripeRes);
  //     }
  //   }
  // );

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 2000,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.YOUR_DOMAIN}/success`,
    cancel_url: `${process.env.YOUR_DOMAIN}/success`,
  });

  res.redirect(303, session.url);
});

module.exports = router;