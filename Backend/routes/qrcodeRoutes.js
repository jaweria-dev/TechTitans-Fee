const express = require('express');
const { generateQRCode } = require('../services/qrcodeService');
const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const { amount, phoneNumber } = req.body;
    const data = `Amount:${amount},Phone:${phoneNumber}`;
    const qrCode = await generateQRCode(data);
    res.json({ qrCode });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
