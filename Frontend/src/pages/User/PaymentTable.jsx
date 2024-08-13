import React, { useState } from "react";
import StripeCheckout from "../StripePayment/Stripe";
import JazzCashCheckout from "../JazzcashPayment/paymentForm";
import EasyPaisaCheckout from "../easypaisaPayment/easypaisaPayment";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import "./PaymentTable.css";

const AlertMessage = () => (
  <div className="alert alert-info alert-message" role="alert">
    You can pay your pending fees via EasyPaisa, JazzCash, or Stripe. Click the
    button below to generate your voucher for the current month.
  </div>
);

const PaymentsTable = ({
  paymentStatus,
  onStripePay,
  onJazzCashPay,
  onEasyPaisaPay,
  onGenerateVoucher,
}) => (
  <div className="payments-table-container">
    <div className="card">
      <div className="card-header">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active">Online payments</a>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <div className="voucher-button-container">
          <p className="text-danger">
            The voucher fee will expire if not paid by the due date.
          </p>
          <button className="btn btn-add" onClick={onGenerateVoucher}>
            Generate current month voucher
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped payments-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Due date</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentStatus.map((status, index) => (
                <tr
                  className={
                    status.status === "Paid"
                      ? "table-secondary"
                      : "table-primary"
                  }
                  key={index}
                >
                  <td>{status.month}</td>
                  <td>Rs: {status.amount} /-</td>
                  <td>{status.dueDate}</td>
                  <td>
                    <div className="payment-methods">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => onEasyPaisaPay(index)}
                      >
                        Pay via EasyPaisa
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => onJazzCashPay(index)}
                      >
                        Pay via JazzCash
                      </button>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => onStripePay(index)}
                      >
                        Pay via Stripe
                      </button>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        status.status === "Paid" ? "bg-success" : "bg-warning"
                      }`}
                    >
                      {status.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const FeePortal = () => {
  const [showStripe, setShowStripe] = useState(false);
  const [showJazzCash, setShowJazzCash] = useState(false);
  const [showEasyPaisa, setShowEasyPaisa] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState([
    {
      month: "Aug-2024",
      amount: 1000,
      dueDate: "10-Aug-2024",
      status: "Pending",
    },
    { month: "Jul-2024", amount: 1000, dueDate: "10-Jul-2024", status: "Paid" },
  ]);

  const handleStripePay = (index) => {
    setShowStripe(true);
    setTimeout(() => {
      setPaymentStatus((prevStatus) =>
        prevStatus.map((item, i) =>
          i === index ? { ...item, status: "Paid" } : item
        )
      );
    }, 2000);
  };

  const handleJazzCashPay = (index) => {
    setShowJazzCash(true);
    setTimeout(() => {
      setPaymentStatus((prevStatus) =>
        prevStatus.map((item, i) =>
          i === index ? { ...item, status: "Paid" } : item
        )
      );
    }, 2000);
  };

  const handleEasyPaisaPay = (index) => {
    setShowEasyPaisa(true);
    setTimeout(() => {
      setPaymentStatus((prevStatus) =>
        prevStatus.map((item, i) =>
          i === index ? { ...item, status: "Paid" } : item
        )
      );
    }, 2000);
  };

  const handleClose = () => {
    setShowStripe(false);
    setShowJazzCash(false);
    setShowEasyPaisa(false);
  };

  const handleGenerateVoucher = () => {
    Swal.fire({
      title: "Voucher Generation",
      text: "Please wait while we process your request. Your voucher will be generated upon admin approval.",
      icon: "info",
      confirmButtonText: "OK",
      confirmButtonColor: "#007bff",
    });
  };

  return (
    <Layout>
      <div className="fee-portal">
        <AlertMessage />
        <PaymentsTable
          paymentStatus={paymentStatus}
          onStripePay={handleStripePay}
          onJazzCashPay={handleJazzCashPay}
          onEasyPaisaPay={handleEasyPaisaPay}
          onGenerateVoucher={handleGenerateVoucher}
        />

        {/* Stripe Modal */}
        <div
          className={`modal fade ${showStripe ? "show d-block" : "d-none"}`}
          role="dialog"
          aria-hidden={!showStripe}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pay via Stripe</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <StripeCheckout />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* JazzCash Modal */}
        <div
          className={`modal fade ${showJazzCash ? "show d-block" : "d-none"}`}
          role="dialog"
          aria-hidden={!showJazzCash}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pay via JazzCash</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <JazzCashCheckout />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* EasyPaisa Modal */}
        <div
          className={`modal fade ${showEasyPaisa ? "show d-block" : "d-none"}`}
          role="dialog"
          aria-hidden={!showEasyPaisa}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pay via EasyPaisa</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <EasyPaisaCheckout />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeePortal;
