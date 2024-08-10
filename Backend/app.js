const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const qrCodeRoutes = require('./routes/qrcodeRoutes');
const dotenv = require('dotenv');
const paymentRoute = require('./routes/payment');

dotenv.config();

const app = express();

const stripe = require("stripe")('sk_test_51Pg5eaRunlLVaZ2Qz31ndkSbxMlj66WYait44gI1xE5HHuEU6UCCxqUhSSqg956BL97pGKMjJbIjG1nK7aKCyyZD00lKHFIqiL');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/qrcode', qrCodeRoutes); //easypaisa 
app.use('/api/payment', paymentRoute); //jazzcash 


app.get('/', (req, res) => {
  res.send('Server is running...');
});

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

