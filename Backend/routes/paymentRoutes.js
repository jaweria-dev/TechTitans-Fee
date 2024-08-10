const express = require('express');
const { makePayment } = require('../services/easypaisaservice');
const router = express.Router();

router.post('/pay', async (req, res) => {
  try {
    const paymentData = req.body;
    const paymentResponse = await makePayment(paymentData);
    res.json(paymentResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
