
const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripe = require("stripe")('sk_test_51KOCtTDE5OEXGmx2DiQbIJr47XG4u3Tbjs4F64104zHAjadCaFWQ7i9nmtsRtPaTa5Gddp5vZ2UoKpSxKWZpqGj600mlayQiDl');


const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
    // Total
    const cartTotal = () => {
      return items.reduce(function (total, item) {
          return total + ((item.quantity || 1) * item.price)
      }, 0)
  }
  console.log((cartTotal() + 5 + 20) * 100)
  return cartTotal() * 100;
};

router.post("/payment", async (req, res) => {
  const { items } = req.body.body
  console.log(items[0].price)

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });

 
});

module.exports = router;