import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';

const routeNames = {
    'products': 'Productos',
    'cart': 'Carrito',
    'login': 'Iniciar Sesión',
    'register': 'Registro',
    'finalizar-pedido': 'Finalizar Pedido'
};

function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    // No mostrar breadcrumbs en la página de inicio
    if (pathnames.length === 0) return null;

    const getBreadcrumbName = (pathname, index) => {
        // Si es una ruta de producto
        if (pathname.startsWith('producto-')) {
            return 'Detalle del Producto';
        }
        return routeNames[pathname] || pathname;
    };

    return (
        <div className={styles.breadcrumbs} aria-label="breadcrumb">
            <Link to="/" className={styles.breadcrumbItem}>
                <i className="fas fa-home"></i> Inicio
            </Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const breadcrumbName = getBreadcrumbName(name, index);

                return (
                    <React.Fragment key={routeTo}>
                        <span className={styles.separator}>/</span>
                        {isLast ? (
                            <span className={`${styles.breadcrumbItem} ${styles.active}`}>
                                {breadcrumbName}
                            </span>
                        ) : (
                            <Link to={routeTo} className={styles.breadcrumbItem}>
                                {breadcrumbName}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default Breadcrumbs; 