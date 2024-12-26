import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import EmptyCart from '../components/EmptyCart';

function Cart() {
    const { state, total } = useCart();

    if (state.items.length === 0) {
        return (
            <div className="container">
                <EmptyCart />
            </div>
        );
    }

    return (
        <div className="container">
            <div className="cart-container">
                <h2 style={{marginBottom: '2rem'}}>Carrito de Compras</h2>
                <div className="cart-items">
                    {state.items.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </div>
                <CartSummary total={total} />
            </div>
        </div>
    );
}

export default Cart; 