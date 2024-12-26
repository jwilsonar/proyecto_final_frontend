import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>                           
            <div>
                <p>Joy Box - Tu tienda de videojuegos</p>
                <p>Ubicación: Av. ficticia Calle Inventada, Somewhere</p>
                <p>Teléfono: <a href="tel:+51980000000">+51 980000000</a></p>
            </div>
            
            <div>
                <p style={{ fontSize: '.85rem', color: 'gray' }}>© Todos los derechos reservados. Tienda ficticia Joy Box</p>
            </div>
        </footer>
    );
}

export default Footer;
