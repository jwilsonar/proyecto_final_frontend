import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import DatosPersonales from '../components/FinalizarPedido/DatosPersonales';
import DireccionEnvio from '../components/FinalizarPedido/DireccionEnvio';
import MetodoPago from '../components/FinalizarPedido/MetodoPago';
import ResumenPedido from '../components/FinalizarPedido/ResumenPedido';
import styles from '../components/FinalizarPedido/FinalizarPedido.module.css';

const STEPS = {
    DATOS: 0,
    DIRECCION: 1,
    PAGO: 2,
    RESUMEN: 3
};

function FinalizarPedido() {
    const navigate = useNavigate();
    const { state, dispatch } = useCart();
    const { user } = useAuth();
    const { addToast } = useToast();
    const [currentStep, setCurrentStep] = useState(STEPS.DATOS);
    const [orderData, setOrderData] = useState({
        datosPersonales: {
            nombre: user?.nombre || '',
            apellido: user?.apellido || '',
            email: user?.email || '',
            telefono: user?.telefono || ''
        },
        direccion: {
            calle: user?.direccion?.calle || '',
            numero: user?.direccion?.numero || '',
            ciudad: user?.direccion?.ciudad || '',
            codigoPostal: user?.direccion?.codigoPostal || '',
            referencias: user?.direccion?.referencias || ''
        },
        metodoPago: {
            tipo: 'tarjeta',
            numero: '',
            nombre: '',
            vencimiento: '',
            cvv: ''
        }
    });

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleUpdateData = (section, data) => {
        setOrderData(prev => ({
            ...prev,
            [section]: data
        }));
    };

    const handleFinishOrder = () => {
        // Aquí iría la lógica para procesar el pedido
        dispatch({ type: 'CLEAR_CART' });
        addToast('¡Pedido realizado con éxito!', 'success');
        navigate('/');
    };

    const renderStep = () => {
        switch (currentStep) {
            case STEPS.DATOS:
                return (
                    <DatosPersonales
                        data={orderData.datosPersonales}
                        onUpdate={(data) => handleUpdateData('datosPersonales', data)}
                        onNext={handleNext}
                    />
                );
            case STEPS.DIRECCION:
                return (
                    <DireccionEnvio
                        data={orderData.direccion}
                        onUpdate={(data) => handleUpdateData('direccion', data)}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case STEPS.PAGO:
                return (
                    <MetodoPago
                        data={orderData.metodoPago}
                        onUpdate={(data) => handleUpdateData('metodoPago', data)}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case STEPS.RESUMEN:
                return (
                    <ResumenPedido
                        orderData={orderData}
                        cartItems={state.items}
                        onFinish={handleFinishOrder}
                        onBack={handleBack}
                    />
                );
            default:
                return null;
        }
    };

    if (state.items.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <h2>No hay productos en el carrito</h2>
                <button onClick={() => navigate('/products')} className={styles.returnButton}>
                    Volver a productos
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.progress}>
                {Object.values(STEPS).map((step) => (
                    <div
                        key={step}
                        className={`${styles.step} ${currentStep >= step ? styles.active : ''}`}
                    >
                        <div className={styles.stepNumber}>{step + 1}</div>
                        <div className={styles.stepLabel}>
                            {step === STEPS.DATOS && 'Datos Personales'}
                            {step === STEPS.DIRECCION && 'Dirección'}
                            {step === STEPS.PAGO && 'Pago'}
                            {step === STEPS.RESUMEN && 'Resumen'}
                        </div>
                    </div>
                ))}
            </div>
            {renderStep()}
        </div>
    );
}

export default FinalizarPedido; 