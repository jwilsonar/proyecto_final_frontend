import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const defaultUser = {
    id: 1,
    nombre: 'Usuario',
    apellido: 'Demo',
    email: 'usuario@demo.com',
    telefono: '999999999',
    direccion: {
        calle: 'Av. Principal',
        numero: '123',
        ciudad: 'Lima',
        codigoPostal: '15001',
        referencias: 'Cerca al parque'
    }
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (email, password) => {
        // Simular login exitoso
        setUser(defaultUser);
        return Promise.resolve();
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};