import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

function ProductCard({ product }) {
    const { dispatch } = useCart();
    const { addToast } = useToast();
    const { user } = useAuth();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch({ type: 'ADD_ITEM', payload: product });
        addToast(`${product.nombre} agregado al carrito`, 'success');
    };

    return (
        <Link to={`/producto/${product.slug}`} className="product-card">
            <div className="product-image">
                <img src={product.imagen} alt={product.nombre} />
            </div>
            <div className="product-info">
                <h3>{product.nombre}</h3>
                <div className="product-details">
                    <p className="price">S/ {product.precio.toFixed(2)}</p>
                    {user && (
                        <button 
                            onClick={handleAddToCart}
                            aria-label="Añadir al carrito"
                        >
                            <i className="fas fa-cart-plus"></i>
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard; 