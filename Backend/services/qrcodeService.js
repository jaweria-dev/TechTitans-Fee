const QRCode = require('qrcode');

const generateQRCode = async (data) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data);
    return qrCodeDataURL;
  } catch (error) {
    throw new Error('Failed to generate QR code');
  }
};

module.exports = {
  generateQRCode
};
