import React from 'react';
import { Link } from 'react-router-dom';

function EmptyCart() {
    return (
        <div className="cart-empty">
            <h2>Tu carrito está vacío</h2>
            <p>¿No sabes qué comprar?</p>
            <Link to="/products" className="cta-button">
                <i className="fas fa-shopping-bag"></i> Ir a Productos
            </Link>
        </div>
    );
}

export default EmptyCart; 