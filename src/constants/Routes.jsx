import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import ProtectedRoute from '../components/ProtectedRoute';
import Producto from '../pages/Producto';
import FinalizarPedido from '../pages/FinalizarPedido';

import MainLayout from '../layouts/MainLayout';

const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'login',
                element: (
                    <ProtectedRoute requiresAuth={false}>
                        <Login />
                    </ProtectedRoute>
                )
            },
            {
                path: 'register',
                element: (
                    <ProtectedRoute requiresAuth={false}>
                        <Register />
                    </ProtectedRoute>
                )
            },
            {
                path: 'products',
                element: (
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                )
            },
            {
                path: 'cart',
                element: (
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                )
            },
            {
                path: 'products/:slug',
                element: <Producto />
            },
            {
                path: 'finalizar-pedido',
                element: (
                    <ProtectedRoute>
                        <FinalizarPedido />
                    </ProtectedRoute>
                )
            }
        ]
    }
];

export default routes;