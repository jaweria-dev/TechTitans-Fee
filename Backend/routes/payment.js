const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();

router.post('/jazzcash', async (req, res) => {
  const { amount, customerEmail, customerPhone, name, course } = req.body;

  const pp_MerchantID = 'MC112922';
  const pp_Password = '01234567890';
  const pp_ReturnURL = 'http://localhost:5173';
  const pp_TxnRefNo = `T${Date.now()}`;
  const date = new Date();
  const pp_TxnDateTime = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
  const pp_TxnExpiryDateTime = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate() + 1).padStart(2, '0')}${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
  const pp_Amount = (amount * 100).toString();

  // Secure Hash Generation
  const hashString = `${pp_Password}&${pp_Amount}&${pp_MerchantID}&${pp_TxnRefNo}&${pp_TxnDateTime}&${pp_ReturnURL}`;
  const secureHash = crypto.createHash('sha256').update(hashString).digest('hex').toUpperCase();

  const payload = {
    pp_Version: "1.1",
    pp_TxnType: "MWALLET",
    pp_Language: "EN",
    pp_MerchantID: pp_MerchantID,
    pp_SubMerchantID: "",
    pp_Password: pp_Password,
    pp_BankID: "",
    pp_ProductID: "",
    pp_TxnRefNo: pp_TxnRefNo,
    pp_Amount: pp_Amount,
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: pp_TxnDateTime,
    pp_BillReference: "billRef",
    pp_Description: "Description of transaction",
    pp_TxnExpiryDateTime: pp_TxnExpiryDateTime,
    pp_ReturnURL: pp_ReturnURL,
    pp_SecureHash: secureHash,
    ppmpf_1: customerPhone,
    ppmpf_2: "",
    ppmpf_3: "",
    ppmpf_4: "",
    ppmpf_5: ""
  };

  try {
    const response = await axios.post('https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction', payload);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
