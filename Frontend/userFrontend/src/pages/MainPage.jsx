import React, { useState } from 'react';
import StripeCheckout from './StripePayment/Stripe'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'; 

const AlertMessage = () => {
  return (
    <div className="alert alert-primary text-center p-4 mx-auto mb-4" role="alert" style={{ maxWidth: '600px', width: '100%' }}>
      You can pay your pending fees via EasyPaisa, JazzCash, or Stripe. Click the button below to generate your voucher for the current month.
    </div>
  );
};

const PaymentsTable = ({ onStripePay }) => {
  return (
    <div className="col-sm-12 col-md-8 mx-auto">
      <div className="card text-center border-0 shadow-sm">
        <div className="card-header">
          <ul className="nav nav-pills card-header-tabs">
            <li className="nav-item" role="presentation">
              <a className="nav-link active" href="#online-payments" style={{ color: 'white', backgroundColor: '#007bff' }}>Online payments</a>
            </li>
          </ul>
        </div>
        <div className="card-body bg-light">
          <div className="d-flex flex-column justify-content-between align-items-center mb-4">
            <p className="text-danger mb-0">The voucher fee will expire if not paid by the due date.</p>
            <button className="btn btn-primary d-flex gap-3 align-items-center mt-2" role="button">Generate current month voucher</button>
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
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
                      <button className="btn btn-outline-primary" onClick={() => window.open('https://easypaisa.com.pk', '_blank')}>Pay via EasyPaisa</button>
                      <button className="btn btn-outline-primary" onClick={() => window.open('https://jazzcash.com.pk', '_blank')}>Pay via JazzCash</button>
                      <button className="btn btn-outline-primary" onClick={onStripePay}>Pay via Stripe</button>
                    </div>
                  </td>
                  <td><span className="badge bg-warning rounded-pill">Pending</span></td>
                </tr>
                <tr className="table-secondary">
                  <td>Jul-2024</td>
                  <td>Rs: 1000 /-</td>
                  <td>10-Jul-2024</td>
                  <td>
                    <div className="d-flex flex-column gap-2">
                      <button className="btn btn-outline-primary" onClick={() => window.open('https://easypaisa.com.pk', '_blank')}>Pay via EasyPaisa</button>
                      <button className="btn btn-outline-primary" onClick={() => window.open('https://jazzcash.com.pk', '_blank')}>Pay via JazzCash</button>
                      <button className="btn btn-outline-primary" onClick={onStripePay}>Pay via Stripe</button>
                    </div>
                  </td>
                  <td><span className="badge bg-success rounded-pill">Paid</span></td>
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

  const handleStripePay = () => {
    setShowStripe(true); // Show Stripe payment modal
  };

  const handleClose = () => setShowStripe(false); // Close Stripe payment modal

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <div className="row w-100">
        <div className="col-12">
          <AlertMessage />
        </div>
        <div className="col-12">
          <PaymentsTable onStripePay={handleStripePay} /> {/* Pass handler to PaymentsTable */}
        </div>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showStripe} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Pay via Stripe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StripeCheckout /> {/* Render StripeCheckout component */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeePortal;
