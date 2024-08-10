import React, { useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import SweetAlert from 'sweetalert2';

// Keyframes for Loader Animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Loader Component
const Loader = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 2s linear infinite;
`;

// Styles
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const Form = styled.form`
  max-width: 500px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  font-family: "Arial, sans-serif";
`;

const FormRow = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 12px 0;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }
`;

const QRCodeImage = styled.img`
  margin-top: 20px;
  max-width: 300px;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// QRCodeForm Component
const QRCodeForm = () => {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qrCode, setQRCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    try {
      const response = await axios.post('http://localhost:9000/api/qrcode/generate', {
        amount,
        phoneNumber
      });
      setQRCode(response.data.qrCode);
      setLoading(false); // Hide loader
      SweetAlert.fire({
        icon: 'success',
        title: 'QR Code Generated!',
        text: 'Your QR code has been generated successfully.',
      });
    } catch (error) {
      setLoading(false); // Hide loader
      SweetAlert.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Failed to generate QR code: ${error.response?.data?.message || 'Something went wrong!'}`,
      });
    }
  };

  return (
    <FormContainer>
      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {!loading && (
        <Form onSubmit={handleSubmit}>
          <h1>EasyPaisa Payment</h1>
          <FormRow>
            <Label>Amount:</Label>
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </FormRow>
          <FormRow>
            <Label>Phone Number:</Label>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </FormRow>
          <Button type="submit">Generate QR Code</Button>
        </Form>
      )}
      {qrCode && (
        <QRCodeImage src={qrCode} alt="QR Code" />
      )}
    </FormContainer>
  );
};

export default QRCodeForm;
