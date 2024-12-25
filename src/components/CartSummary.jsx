import React from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

function CartSummary({ total }) {
    const { addToast } = useToast();

    const handleCheckout = () => {
        addToast('Función de pago en desarrollo', 'info');
    };

    return (
        <div className="cart-summary">
            <div className="cart-total">
                <h3>Total del Carrito</h3>
                <p className="total-amount">S/ {total.toFixed(2)}</p>
            </div>
            <div className="cart-actions">
                <Link to="/products" className="continue-shopping">
                    <i className="fas fa-arrow-left"></i> Seguir comprando
                </Link>
                <button 
                    className="checkout-btn"
                    onClick={handleCheckout}
                >
                    <i className="fas fa-credit-card"></i> Proceder al pago
                </button>
            </div>
        </div>
    );
}

export default CartSummary; 