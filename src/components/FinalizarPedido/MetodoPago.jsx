import React, { useState } from 'react';
import styles from './FinalizarPedido.module.css';

function MetodoPago({ data, onUpdate, onNext, onBack }) {
    const [formData, setFormData] = useState(data);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (formData.tipo === 'tarjeta') {
            if (!formData.numero) newErrors.numero = 'El número de tarjeta es requerido';
            if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
            if (!formData.vencimiento) newErrors.vencimiento = 'La fecha de vencimiento es requerida';
            if (!formData.cvv) newErrors.cvv = 'El CVV es requerido';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            onUpdate(formData);
            onNext();
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Método de Pago</h2>
            <div className={styles.formGroup}>
                <label htmlFor="tipo">Tipo de Pago</label>
                <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                >
                    <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                    <option value="efectivo">Pago en Efectivo</option>
                </select>
            </div>

            {formData.tipo === 'tarjeta' && (
                <>
                    <div className={styles.formGroup}>
                        <label htmlFor="numero">Número de Tarjeta</label>
                        <input
                            type="text"
                            id="numero"
                            name="numero"
                            value={formData.numero}
                            onChange={handleChange}
                            maxLength="16"
                        />
                        {errors.numero && <span className={styles.error}>{errors.numero}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="nombre">Nombre en la Tarjeta</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                        {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="vencimiento">Vencimiento</label>
                            <input
                                type="text"
                                id="vencimiento"
                                name="vencimiento"
                                placeholder="MM/AA"
                                value={formData.vencimiento}
                                onChange={handleChange}
                            />
                            {errors.vencimiento && <span className={styles.error}>{errors.vencimiento}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                maxLength="4"
                                value={formData.cvv}
                                onChange={handleChange}
                            />
                            {errors.cvv && <span className={styles.error}>{errors.cvv}</span>}
                        </div>
                    </div>
                </>
            )}

            <div className={styles.formActions}>
                <button type="button" onClick={onBack} className={styles.backButton}>
                    Atrás
                </button>
                <button type="submit" className={styles.nextButton}>
                    Siguiente
                </button>
            </div>
        </form>
    );
}

export default MetodoPago; 