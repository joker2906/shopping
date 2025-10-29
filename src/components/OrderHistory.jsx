import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './OrderHistory.css';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { orders } = useCart();

  return (
    <div className="order-history-container" style={{ textAlign: 'center' }}>
      <div className="order-history-header" style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 30px rgba(255, 215, 0, 0.3)' }}>My Order History</h1>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders" style={{ textAlign: 'center' }}>
          <p style={{ textAlign: 'center', fontSize: '1.3rem', color: 'rgba(232, 232, 232, 0.9)', marginBottom: '3rem', fontWeight: '300' }}>You haven't placed any orders yet.</p>
          <button className="back-home-btn" onClick={() => navigate('/home')} style={{ textAlign: 'center' }}>Start Shopping</button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="order-card" style={{ textAlign: 'center' }}>
              <div className="order-header" style={{ textAlign: 'center' }}>
                <h3 className="order-id" style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 15px rgba(255, 215, 0, 0.5)' }}>Order #{order.id}</h3>
                <span className="order-date" style={{ textAlign: 'center', color: 'rgba(232, 232, 232, 0.7)', fontWeight: '500' }}>{new Date(order.date).toLocaleDateString()}</span>
              </div>
              <div className="order-total" style={{ textAlign: 'center', fontFamily: "'Playfair Display', serif", color: '#ffd700', textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>
                Total: ₹{order.total.toFixed(2)}
              </div>
              <div className="order-items" style={{ textAlign: 'center' }}>
                <h4 style={{ textAlign: 'center', color: '#ffd700', fontWeight: '600', textShadow: '0 0 15px rgba(255, 215, 0, 0.5)' }}>Items Ordered:</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item" style={{ textAlign: 'left' }}>
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="order-item-details" style={{ textAlign: 'left' }}>
                      <h5 style={{ textAlign: 'left', color: '#e8e8e8', fontSize: '1.1rem', fontWeight: '600' }}>{item.name}</h5>
                      <p style={{ textAlign: 'left', color: 'rgba(232, 232, 232, 0.7)', fontSize: '1rem' }}>Size: {item.size} | Quantity: {item.quantity} | Price: {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="back-home-btn" onClick={() => navigate('/home')} style={{ textAlign: 'center' }}>Continue Shopping</button>
    </div>
  );
};

export default OrderHistory;
