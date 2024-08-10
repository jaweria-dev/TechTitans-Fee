// backend/services/easypaisaService.js
const axios = require('axios');

const makePayment = async (paymentData) => {
  try {
    const response = await axios.post('https://easypaisa.com/api/payment', paymentData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EASYPAISA_API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

module.exports = {
  makePayment
};
