const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// require('dotenv').config();

const app = express();

const stripe = require("stripe")('sk_test_51Pg5eaRunlLVaZ2Qz31ndkSbxMlj66WYait44gI1xE5HHuEU6UCCxqUhSSqg956BL97pGKMjJbIjG1nK7aKCyyZD00lKHFIqiL');

app.use(cors());
app.use(bodyParser.json());

const calculateOrderAmount = (items) => {
    return 2000; 
};

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });
  
      res.status(200).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

// Define the port the server will run on
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
