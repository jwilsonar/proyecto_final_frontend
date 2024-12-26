import React from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { useProducts } from '../context/ProductsContext';
import '../styles/Products.css';

function Products() {
    const { 
        getPaginatedProducts, 
        currentPage, 
        totalPages, 
        changePage,
        filters,
        updateFilters
    } = useProducts();
    
    const products = getPaginatedProducts();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'precioMin' || name === 'precioMax') {
            updateFilters({
                precio: {
                    ...filters.precio,
                    [name === 'precioMin' ? 'min' : 'max']: Number(value) || 0
                }
            });
        } else {
            updateFilters({ [name]: value });
        }
    };

    return (
        <div className="container">
            <h2 style={{marginBottom:"2rem"}}>Productos</h2>
            
            <div className="filters-container" style={{marginBottom: "2rem"}}>
                <div className="filter-group">
                    <label>Precio Mínimo:</label>
                    <input
                        type="number"
                        name="precioMin"
                        value={filters.precio.min}
                        onChange={handleFilterChange}
                        min="0"
                    />
                </div>

                <div className="filter-group">
                    <label>Precio Máximo:</label>
                    <input
                        type="number"
                        name="precioMax"
                        value={filters.precio.max}
                        onChange={handleFilterChange}
                        min="0"
                    />
                </div>

                <div className="filter-group">
                    <label>Categoría:</label>
                    <select 
                        name="categoria" 
                        value={filters.categoria}
                        onChange={handleFilterChange}
                    >
                        <option value="">Todas</option>
                        <option value="Acción">Acción</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Deportes">Deportes</option>
                        <option value="RPG">RPG</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Plataforma:</label>
                    <select 
                        name="plataforma" 
                        value={filters.plataforma}
                        onChange={handleFilterChange}
                    >
                        <option value="">Todas</option>
                        <option value="PS5">PS5</option>
                        <option value="PS4">PS4</option>
                        <option value="Xbox Series">Xbox Series</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                    </select>
                </div>
            </div>

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