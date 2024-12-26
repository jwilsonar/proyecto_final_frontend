import React, { useState } from 'react';
import styles from './FinalizarPedido.module.css';

function DatosPersonales({ data, onUpdate, onNext }) {
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
        if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido) newErrors.apellido = 'El apellido es requerido';
        if (!formData.email) newErrors.email = 'El email es requerido';
        if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido';
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
            <h2>Datos Personales</h2>
            <div className={styles.formGroup}>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="apellido">Apellido</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                />
                {errors.apellido && <span className={styles.error}>{errors.apellido}</span>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="telefono">Teléfono</label>
                <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                />
                {errors.telefono && <span className={styles.error}>{errors.telefono}</span>}
            </div>
            <div className={styles.formActions}>
                <button type="submit" className={styles.nextButton}>
                    Siguiente
                </button>
            </div>
        </form>
    );
}

export default DatosPersonales; 