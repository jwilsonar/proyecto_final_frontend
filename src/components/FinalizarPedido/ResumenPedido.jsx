import React from 'react';
import styles from './FinalizarPedido.module.css';

function ResumenPedido({ orderData, cartItems, onFinish, onBack }) {
    const subtotal = cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    return (
        <div className={styles.resumen}>
            <h2>Resumen del Pedido</h2>
            
            <div className={styles.section}>
                <h3>Datos Personales</h3>
                <p>{orderData.datosPersonales.nombre} {orderData.datosPersonales.apellido}</p>
                <p>{orderData.datosPersonales.email}</p>
                <p>{orderData.datosPersonales.telefono}</p>
            </div>

            <div className={styles.section}>
                <h3>Dirección de Envío</h3>
                <p>{orderData.direccion.calle} {orderData.direccion.numero}</p>
                <p>{orderData.direccion.ciudad}, {orderData.direccion.codigoPostal}</p>
                {orderData.direccion.referencias && (
                    <p>Referencias: {orderData.direccion.referencias}</p>
                )}
            </div>

            <div className={styles.section}>
                <h3>Método de Pago</h3>
                <p>{orderData.metodoPago.tipo === 'tarjeta' ? 'Tarjeta' : 'Efectivo'}</p>
                {orderData.metodoPago.tipo === 'tarjeta' && (
                    <p>Tarjeta terminada en: {orderData.metodoPago.numero.slice(-4)}</p>
                )}
            </div>

            <div className={styles.section}>
                <h3>Productos</h3>
                <div className={styles.productList}>
                    {cartItems.map(item => (
                        <div key={item.id} className={styles.productItem}>
                            <div className={styles.productInfo}>
                                <span>{item.nombre}</span>
                                <span>x{item.quantity}</span>
                            </div>
                            <span>S/ {(item.precio * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.totals}>
                <div className={styles.totalRow}>
                    <span>Subtotal</span>
                    <span>S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                    <span>IGV (18%)</span>
                    <span>S/ {igv.toFixed(2)}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.finalTotal}`}>
                    <span>Total</span>
                    <span>S/ {total.toFixed(2)}</span>
                </div>
            </div>

            <div className={styles.formActions}>
                <button type="button" onClick={onBack} className={styles.backButton}>
                    Atrás
                </button>
                <button type="button" onClick={onFinish} className={styles.finishButton}>
                    Confirmar Pedido
                </button>
            </div>
        </div>
    );
}

export default ResumenPedido; 