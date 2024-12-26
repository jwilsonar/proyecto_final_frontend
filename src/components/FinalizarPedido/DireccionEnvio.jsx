import React, { useState } from 'react';
import styles from './FinalizarPedido.module.css';

function DireccionEnvio({ data, onUpdate, onNext, onBack }) {
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
        if (!formData.calle) newErrors.calle = 'La calle es requerida';
        if (!formData.numero) newErrors.numero = 'El número es requerido';
        if (!formData.ciudad) newErrors.ciudad = 'La ciudad es requerida';
        if (!formData.codigoPostal) newErrors.codigoPostal = 'El código postal es requerido';
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
            <h2>Dirección de Envío</h2>
            <div className={styles.formGroup}>
                <label htmlFor="calle">Calle</label>
                <input
                    type="text"
                    id="calle"
                    name="calle"
                    value={formData.calle}
                    onChange={handleChange}
                />
                {errors.calle && <span className={styles.error}>{errors.calle}</span>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="numero">Número</label>
                <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                />
                {errors.numero && <span className={styles.error}>{errors.numero}</span>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="ciudad">Ciudad</label>
                <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                />
                {errors.ciudad && <span className={styles.error}>{errors.ciudad}</span>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="codigoPostal">Código Postal</label>
                <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                />
                {errors.codigoPostal && <span className={styles.error}>{errors.codigoPostal}</span>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="referencias">Referencias</label>
                <textarea
                    id="referencias"
                    name="referencias"
                    value={formData.referencias}
                    onChange={handleChange}
                />
            </div>
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

export default DireccionEnvio; 