import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
  let newState;
  
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
      break;

    case 'REMOVE_ITEM':
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      break;

    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
      break;

    case 'CLEAR_CART':
      newState = {
        ...state,
        items: []
      };
      break;

    case 'LOAD_CART':
      newState = {
        ...state,
        items: action.payload
      };
      break;

    default:
      return state;
  }

  // Guardar en localStorage después de cada cambio
  if (action.userId) {
    localStorage.setItem(`cart_${action.userId}`, JSON.stringify(newState.items));
  }

  return newState;
};

const initialState = {
  items: []
};

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito del localStorage cuando el usuario inicia sesión
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        dispatch({
          type: 'LOAD_CART',
          payload: JSON.parse(savedCart),
          userId: user.id
        });
      }
    }
  }, [user]);

  // Wrapper para dispatch que incluye el userId
  const dispatchWithUser = (action) => {
    if (user) {
      dispatch({ ...action, userId: user.id });
    } else {
      dispatch(action);
    }
  };

  const total = state.items.reduce(
    (sum, item) => sum + item.precio * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch: dispatchWithUser,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};