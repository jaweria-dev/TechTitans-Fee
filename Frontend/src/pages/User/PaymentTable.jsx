import React, { useState } from "react";
import StripeCheckout from "../StripePayment/Stripe";
import JazzCashCheckout from "../JazzcashPayment/paymentForm";
import EasyPaisaCheckout from "../easypaisaPayment/easypaisaPayment";
import { Modal } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import "./PaymentTable.css"; // Import the CSS file

const AlertMessage = () => {
  return (
    <div
      className="alert alert-primary text-center p-4 mx-auto mb-4 alert-message"
      role="alert"
    >
      You can pay your pending fees via EasyPaisa, JazzCash, or Stripe. Click
      the button below to generate your voucher for the current month.
    </div>
  );
};

const PaymentsTable = ({ onStripePay, onJazzCashPay, onEasyPaisaPay }) => {
  return (
    <div className="col-sm-12 col-md-8 mx-auto">
      <div className="card text-center border-0 shadow-sm">
        <div className="card-header">
          <ul className="nav nav-pills card-header-tabs">
            <li className="nav-item" role="presentation">
              <a
                className="nav-link active"
                href="#online-payments"
                style={{ color: "white", backgroundColor: "#007bff" }}
              >
                Online payments
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body bg-light">
          <div className="d-flex flex-column justify-content-between align-items-center mb-4">
            <p className="text-danger mb-0">
              The voucher fee will expire if not paid by the due date.
            </p>
            <button
              className="btn btn-primary d-flex gap-3 align-items-center mt-2"
              role="button"
            >
              Generate current month voucher
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-striped payments-table">
              <thead>
                <tr>
                  <th className="text-left" scope="col">Month</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Due date</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-primary">
                  <td>Aug-2024</td>
                  <td>Rs: 1000 /-</td>
                  <td>10-Aug-2024</td>
                  <td>
                    <div className="d-flex flex-column gap-2">
                      <button
                        className="btn btn-outline-primary"
                        onClick={onEasyPaisaPay}
                      >
                        Pay via EasyPaisa
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={onJazzCashPay}
                      >
                        Pay via JazzCash
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={onStripePay}
                      >
                        Pay via Stripe
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-warning rounded-pill">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr className="table-secondary">
                  <td>Jul-2024</td>
                  <td>Rs: 1000 /-</td>
                  <td>10-Jul-2024</td>
                  <td>
                    <div className="d-flex flex-column gap-2">
                      <button
                        className="btn btn-outline-primary"
                        onClick={onEasyPaisaPay}
                      >
                        Pay via EasyPaisa
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={onJazzCashPay}
                      >
                        Pay via JazzCash
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={onStripePay}
                      >
                        Pay via Stripe
                      </button>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-success rounded-pill">Paid</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeePortal = () => {
  const [showStripe, setShowStripe] = useState(false);
  const [showJazzCash, setShowJazzCash] = useState(false);
  const [showEasyPaisa, setShowEasyPaisa] = useState(false);

  const handleStripePay = () => setShowStripe(true);
  const handleJazzCashPay = () => setShowJazzCash(true);
  const handleEasyPaisaPay = () => setShowEasyPaisa(true);

  const handleClose = () => {
    setShowStripe(false);
    setShowJazzCash(false);
    setShowEasyPaisa(false);
  };

  return (
    <Layout>
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
            />
          </div>
        </div>

        <Modal show={showStripe} onHide={handleClose} centered>
          <div className="modal-header">
            <Modal.Title>Pay via Stripe</Modal.Title>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <StripeCheckout />
          </div>
          <div className="modal-footer">
            <button className="custom-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </Modal>

        <Modal show={showJazzCash} onHide={handleClose} centered>
          <div className="modal-header">
            <Modal.Title>Pay via JazzCash</Modal.Title>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <JazzCashCheckout />
          </div>
          <div className="modal-footer">
            <button className="custom-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </Modal>

        <Modal show={showEasyPaisa} onHide={handleClose} centered>
          <div className="modal-header">
            <Modal.Title>Pay via EasyPaisa</Modal.Title>
            <button type="button" className="close" onClick={handleClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <EasyPaisaCheckout />
          </div>
          <div className="modal-footer">
            <button className="custom-button" onClick={handleClose}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default FeePortal;
