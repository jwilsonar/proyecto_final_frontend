import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { ProductsProvider } from './context/ProductsContext'
import './App.css'
import routes from './constants/Routes'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ProductsProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                {routes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element}>
                    {route.children?.map((childRoute) => (
                      <Route
                        key={childRoute.path}
                        path={childRoute.path}
                        element={childRoute.element}
                      />
                    ))}
                  </Route>
                ))}
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </ProductsProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
