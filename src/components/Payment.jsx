import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, addOrder, clearCart } = useCart();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const total = getCartTotal();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      // Allow only numbers and limit to 16 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
      // Add spaces every 4 digits
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    } else if (name === 'cvv') {
      // Allow only numbers and limit to 3 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    } else if (name === 'expiryDate') {
      // Allow only numbers and format as MM/YY
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      formattedValue = formattedValue.slice(0, 5); // Limit to MM/YY format
    }

    setPaymentDetails({
      ...paymentDetails,
      [name]: formattedValue
    });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv || !paymentDetails.nameOnCard) {
      alert('Please fill in all payment details');
      return;
    }

    // Validate card number: must be exactly 16 digits
    const cardNumberDigits = paymentDetails.cardNumber.replace(/\s/g, '');
    if (cardNumberDigits.length !== 16) {
      alert('Card number is wrong. Please enter a valid 16-digit card number.');
      return;
    }

    // Validate CVV: must be exactly 3 digits
    if (paymentDetails.cvv.length !== 3) {
      alert('CVV is wrong. Please enter a valid 3-digit CVV.');
      return;
    }

    // Validate expiry date: must be in MM/YY format
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(paymentDetails.expiryDate)) {
      alert('Expiry date is wrong. Please enter in MM/YY format.');
      return;
    }

    // Simulate payment processing
    const success = Math.random() > 0.1; // 90% success rate for demo

    if (success) {
      const order = {
        items: cart,
        total: total,
        shippingDetails: { /* from checkout */ },
        paymentDetails: { ...paymentDetails, cardNumber: '**** **** **** ' + paymentDetails.cardNumber.slice(-4) }
      };
      addOrder(order);
      clearCart();
      alert('Payment successful! Order placed.');
      navigate('/orders');
    } else {
      alert('Payment failed. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="payment-container" style={{ textAlign: 'center' }}>
        <div className="payment-header" style={{ textAlign: 'center' }}>
          <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>Payment</h1>
        </div>
        <div className="empty-payment" style={{ textAlign: 'center' }}>
          <p style={{ textAlign: 'center', fontSize: '1.3rem', color: 'rgba(232, 232, 232, 0.9)', marginBottom: '3rem', fontWeight: '300' }}>No items to pay for. Please add items to cart.</p>
          <button className="empty-payment-btn" onClick={() => navigate('/home')} style={{ textAlign: 'center' }}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container" style={{ textAlign: 'center' }}>
      <div className="payment-header" style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>Secure Payment</h1>
      </div>

      <div className="payment-content" style={{ textAlign: 'center' }}>
        <div className="order-summary" style={{ textAlign: 'center' }}>
          <h2 style={{ textAlign: 'center', color: '#ffd700', fontFamily: "'Playfair Display', serif", textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Order Summary</h2>
          {cart.map((item, index) => (
            <div key={index} className="order-item" style={{ textAlign: 'left' }}>
              <img src={item.image} alt={item.name} className="order-item-image" />
              <div className="order-item-details" style={{ textAlign: 'left' }}>
                <h4 style={{ textAlign: 'left', color: '#e8e8e8', fontSize: '1.2rem', fontWeight: '600' }}>{item.name}</h4>
                <p style={{ textAlign: 'left', color: 'rgba(232, 232, 232, 0.7)', fontSize: '1rem' }}>Size: {item.size} | Quantity: {item.quantity} | Price: {item.price}</p>
              </div>
            </div>
          ))}
          <div className="order-total" style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>
            Total: ₹{total.toFixed(2)}
          </div>
        </div>

        <div className="payment-form" style={{ textAlign: 'center' }}>
          <form onSubmit={handlePayment} style={{ textAlign: 'center' }}>
            <h2 style={{ textAlign: 'center', color: '#ffd700', fontFamily: "'Playfair Display', serif", textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>Payment Details</h2>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label style={{ textAlign: 'left', color: '#e8e8e8', fontWeight: '600' }}>Name on Card:</label>
              <input
                type="text"
                name="nameOnCard"
                value={paymentDetails.nameOnCard}
                onChange={handleInputChange}
                required
                placeholder="John Doe"
                style={{ textAlign: 'left' }}
              />
            </div>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label style={{ textAlign: 'left', color: '#e8e8e8', fontWeight: '600' }}>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
                style={{ textAlign: 'left' }}
              />
            </div>
            <div className="card-details-row" style={{ textAlign: 'center' }}>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label style={{ textAlign: 'left', color: '#e8e8e8', fontWeight: '600' }}>Expiry Date:</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                  style={{ textAlign: 'left' }}
                />
              </div>
              <div className="form-group" style={{ textAlign: 'left' }}>
                <label style={{ textAlign: 'left', color: '#e8e8e8', fontWeight: '600' }}>CVV:</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                  style={{ textAlign: 'left' }}
                />
              </div>
            </div>
            <button type="submit" className="pay-btn" style={{ textAlign: 'center' }}>
              Pay ₹{total.toFixed(2)}
            </button>
          </form>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate('/checkout')} style={{ textAlign: 'center' }}>Back to Checkout</button>
    </div>
  );
};

export default Payment;
