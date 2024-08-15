import React, { useState } from "react";
import StripeCheckout from "../StripePayment/Stripe";
import JazzCashCheckout from "../JazzcashPayment/paymentForm";
import EasyPaisaCheckout from "../easypaisaPayment/easypaisaPayment";
import "./PaymentTable.css";
import SweetAlert from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
// import axios from "axios"; // Add this to make API calls

const CustomModalHeader = styled(Modal.Header)`
  background-color: #007bff;
  color: white;
  border-bottom: none;
`;

const CustomModalBody = styled(Modal.Body)`
  padding: 5px;
`;

const CustomModalFooter = styled(Modal.Footer)`
  border-top: none;
  padding: 5px;
`;

const CustomButton = styled(Button)`
  background-color: #007bff;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const AlertMessage = () => {
  return (
    <div
      className="alert alert-primary text-center p-4 mx-auto mb-4 fs-4"
      role="alert"
      style={{ maxWidth: "600px", width: "100%" }}
    >
      You can pay your pending fees via EasyPaisa, JazzCash, or Stripe. Click
      the button below to generate your voucher for the current month.
    </div>
  );
};

const PaymentsTable = ({
  onStripePay,
  onJazzCashPay,
  onEasyPaisaPay,
  onGenerateVoucher,
}) => {
  return (
    <div className="d-flex flex-column justify-content-between align-items-center mb-4">
      <p className="text-danger mb-0">
        The voucher fee will expire if not paid by the due date.
      </p>
      <button
        className="btn-primary d-flex gap-3 align-items-center mt-2 generate-voucher"
        style={{ width: "fit-content" }}
        onClick={onGenerateVoucher}
      >
        Generate current month voucher
      </button>

      <div className="container mt-5">
        <div className="row justify-content-center gap-1">
          <div
            className="col-12 col-md-4 mb-3"
            style={{ display: "flex", gap: "10px" }}
          >
            <button
              className="crt-std-btn btn-outline-primary fs-6 w-100"
              onClick={onEasyPaisaPay}
            >
              Pay via EasyPaisa
            </button>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <button
              className="crt-std-btn btn-outline-primary fs-6 w-100"
              onClick={onJazzCashPay}
            >
              Pay via JazzCash
            </button>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <button
              className="crt-std-btn btn-outline-primary fs-6 w-100"
              onClick={onStripePay}
            >
              Pay via Stripe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentTable = () => {
  const [showStripe, setShowStripe] = useState(false);
  const [showJazzCash, setShowJazzCash] = useState(false);
  const [showEasyPaisa, setShowEasyPaisa] = useState(false);
  // const [voucherGenerated, setVoucherGenerated] = useState(false);



  const handleStripePay = () => {
    setShowStripe(true);
  };

  const handleJazzCashPay = () => {
    setShowJazzCash(true);
  };

  const handleEasyPaisaPay = () => {
    setShowEasyPaisa(true);
  };

  const handleClose = () => {
    setShowStripe(false);
    setShowJazzCash(false);
    setShowEasyPaisa(false);
  };

  const handleGenerateVoucher = () => {
    SweetAlert.fire({
      icon: "info",
      title:
        "Your request has been sent to the admin. The admin will generate your voucher shortly.",
      confirmButtonText: "OK",
    });
  };


  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <div className="row w-100">
        <div className="col-12">
          <AlertMessage />
        </div>
        <div className="col-12">
          <PaymentsTable
            onStripePay={handleStripePay}
            onJazzCashPay={handleJazzCashPay}
            onEasyPaisaPay={handleEasyPaisaPay}
            onGenerateVoucher={handleGenerateVoucher} 
          />
        </div>
      </div>

      {/* Stripe Payment Modal */}
      <Modal show={showStripe} onHide={handleClose} centered>
        <CustomModalHeader closeButton>
          <Modal.Title>Pay via Stripe</Modal.Title>
        </CustomModalHeader>
        <CustomModalBody>
          <StripeCheckout />
        </CustomModalBody>
        <CustomModalFooter>
          <CustomButton onClick={handleClose}>Close</CustomButton>
        </CustomModalFooter>
      </Modal>

      {/* JazzCash Payment Modal */}
      <Modal show={showJazzCash} onHide={handleClose} centered>
        <CustomModalHeader closeButton>
          <Modal.Title>Pay via JazzCash</Modal.Title>
        </CustomModalHeader>
        <CustomModalBody>
          <JazzCashCheckout />
        </CustomModalBody>
        <CustomModalFooter>
          <CustomButton onClick={handleClose}>Close</CustomButton>
        </CustomModalFooter>
      </Modal>

      {/* EasyPaisa Payment Modal */}
      <Modal show={showEasyPaisa} onHide={handleClose} centered>
        <CustomModalHeader closeButton>
          <Modal.Title>Pay via EasyPaisa</Modal.Title>
        </CustomModalHeader>
        <CustomModalBody>
          <EasyPaisaCheckout />
        </CustomModalBody>
        <CustomModalFooter>
          <CustomButton onClick={handleClose}>Close</CustomButton>
        </CustomModalFooter>
      </Modal>
    </div>
  );
};

export default PaymentTable;
