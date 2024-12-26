import React, { useState } from 'react';
import Range from 'react-range';

const PriceFilter = ({ products, onFilter }) => {
    const [values, setValues] = useState([0, 1000]); // Rango inicial de precios

    const handleChange = (values) => {
        setValues(values);
        onFilter(values); // Llama a la función de filtrado padre
    };

    return (
        <div>
        <Range
            step={10}
            min={0}
            max={1000}
            values={values}
            onChange={handleChange}
            renderTrack={({ props, children }) => (
            <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                ...props.style,
                height: '6px',
                width: '100%',
                backgroundColor: '#ccc',
                }}
            >
                <div
                ref={props.ref}
                style={{
                    height: '6px',
                    width: `${values[1] - values[0]}%`,
                    backgroundColor: '#548BF4',
                    borderRadius: '4px',
                    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
                }}
                >
                {children}
                </div>
            </div>
            )}
            renderThumb={({ props, isDragged }) => (
            <div
                {...props}
                style={{
                ...props.style,
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 1,
                }}
            >
                <div
                style={{
                    height: '16px',
                    width: '16px',
                    borderRadius: '50%',
                    backgroundColor: isDragged ? '#548BF4' : '#ccc',
                }}
                />
            </div>
            )}
        />
        <div>
            Precio: {values[0]} - {values[1]}
        </div>
        </div>
    );
};

export default PriceFilter;