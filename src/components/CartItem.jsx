import React from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function CartItem({ item }) {
    const { dispatch } = useCart();
    const { addToast } = useToast();

    const handleRemoveItem = () => {
        dispatch({ type: 'REMOVE_ITEM', payload: item.id });
        addToast(`${item.nombre} eliminado del carrito`, 'info');
    };

    const handleUpdateQuantity = (newQuantity) => {
        if (newQuantity < 1) {
            handleRemoveItem();
            return;
        }
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { id: item.id, quantity: newQuantity }
        });
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={item.imagen} alt={item.nombre} />
            </div>
            <div className="cart-item-details">
                <h3>{item.nombre}</h3>
                <p className="price">S/ {item.precio}</p>
                <div className="quantity-controls">
                    <button 
                        onClick={() => handleUpdateQuantity(item.quantity - 1)}
                        className="quantity-btn"
                        aria-label="Reducir cantidad"
                    >
                        <i className="fas fa-minus"></i>
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                        onClick={() => handleUpdateQuantity(item.quantity + 1)}
                        className="quantity-btn"
                        aria-label="Aumentar cantidad"
                    >
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
                <p className="subtotal">
                    Subtotal: S/ {(item.precio * item.quantity).toFixed(2)}
                </p>
            </div>
            <button 
                className="remove-btn"
                onClick={handleRemoveItem}
                aria-label="Eliminar del carrito"
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
}

export default CartItem; 