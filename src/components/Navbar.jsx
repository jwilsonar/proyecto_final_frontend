import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function Navbar() {
    const { state } = useCart();
    const { user, logout } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        logout();
        addToast('Sesión cerrada exitosamente', 'info');
        navigate('/');
    };

    return (
        <nav>
            <div className="nav-brand">
                <NavLink to="/" end>
                    <i className="fas fa-gamepad"></i>
                    Joy Box
                </NavLink>
            </div>
            <div className="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? 'nav__active' : '')}
                    >
                        <i className="fas fa-home"></i> Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/products"
                        className={({ isActive }) => (isActive ? 'nav__active' : '')}
                    >
                        <i className="fas fa-shopping-bag"></i>
                        <p>Productos</p>
                    </NavLink>
                </li>
                {user ? (
                    <>
                        
                        <li className="cart-menu-item">
                            <NavLink
                                to="/cart"
                                className={({ isActive }) => (isActive ? 'nav__active' : '')}
                            >
                                <i className="fas fa-shopping-cart"></i>                                
                                <span className={`cart-count ${totalItems > 0 ? 'active' : ''}`}>
                                    {totalItems}
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="nav-button">
                                <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) => (isActive ? 'nav__active' : '')}
                            >
                                <i className="fas fa-sign-in-alt"></i> Iniciar sesión
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/register"
                                className={({ isActive }) => (isActive ? 'nav__active' : '')}
                            >
                                <i className="fas fa-user-plus"></i> Registro
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
