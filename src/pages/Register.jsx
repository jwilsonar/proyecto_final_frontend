import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
        }
        // Aquí iría la lógica de registro
        console.log('Datos de registro:', formData);
        navigate('/login');
    };

    return (
        <div className="register-container">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="username">Nombre de usuario</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar contraseña</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default Register; 