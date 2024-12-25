import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

function Producto() {
    const { slug } = useParams();
    const { getProductBySlug, getSimilarProducts } = useProducts();
    const { dispatch } = useCart();
    const { addToast } = useToast();
    const { user } = useAuth();

    const product = getProductBySlug(slug);
    
    if (!product) {
        return (
            <div className="container">
                <div className="error-message">
                    <h2>Producto no encontrado</h2>
                    <Link to="/products" className="cta-button">
                        Volver a productos
                    </Link>
                </div>
            </div>
        );
    }

    const similarProducts = getSimilarProducts(product);

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_ITEM', payload: product });
        addToast(`${product.nombre} agregado al carrito`, 'success');
    };

    return (
        <div className="container">
            <div className="product-detail">
                <div className="product-detail__image">
                    <img src={product.imagen} alt={product.nombre} />
                </div>
                <div className="product-detail__info">
                    <h1>{product.nombre}</h1>
                    <div className="product-meta">
                        <span className="platform">{product.plataforma}</span>
                    </div>
                    <p className="price">S/ {product.precio}</p>
                    <div className="stock-info">
                        <i className={`fas ${product.stock > 0 ? 'fa-check' : 'fa-times'}`}></i>
                        {product.stock > 0 ? (
                            <span className="in-stock">En stock ({product.stock} disponibles)</span>
                        ) : (
                            <span className="out-of-stock">Agotado</span>
                        )}
                    </div>
                    {user && product.stock > 0 && (
                        <button onClick={handleAddToCart} className="add-to-cart-btn">
                            <i className="fas fa-shopping-cart"></i> Añadir al carrito
                        </button>
                    )}
                    <div className="product-description">
                        <h2>Descripción</h2>
                        <p>{product.descripcion}</p>
                    </div>
                    <div className="product-features">
                        <h2>Características</h2>
                        <ul>
                            {product.caracteristicas.map((feature, index) => (
                                <li key={index}>
                                    <i className="fas fa-check"></i> {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="product-additional-info">
                        <p><strong>Lanzamiento:</strong> {product.lanzamiento}</p>
                        <p><strong>Desarrollador:</strong> {product.desarrollador}</p>
                    </div>
                </div>
            </div>

            <section className="similar-products">
                <h2>Productos similares</h2>
                <div className="products-grid">
                    {similarProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Producto;
