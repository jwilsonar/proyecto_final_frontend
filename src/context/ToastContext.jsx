import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success') => {
        const id = Date.now();
        const newToast = {
            id,
            message,
            type,
        };
        
        setToasts(current => [...current, newToast]);

        // Eliminar el toast después de 3 segundos
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    };

    const removeToast = (id) => {
        setToasts(current => current.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div id="toast-container">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`toast ${toast.type}`}
                        onClick={() => removeToast(toast.id)}
                    >
                        <i className={`fas ${
                            toast.type === 'success' ? 'fa-check-circle' : 
                            toast.type === 'error' ? 'fa-exclamation-circle' : 
                            'fa-info-circle'
                        }`}></i>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast debe ser usado dentro de un ToastProvider');
    }
    return context;
}; 