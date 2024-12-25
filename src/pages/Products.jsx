import React from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { useProducts } from '../context/ProductsContext';

function Products() {
    const { getPaginatedProducts, currentPage, totalPages, changePage } = useProducts();
    const products = getPaginatedProducts();

    return (
        <div className="products-container container">
            <h2>Productos</h2>
            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={changePage}
            />
        </div>
    );
}

export default Products; 