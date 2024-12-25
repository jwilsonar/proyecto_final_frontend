import React, { createContext, useContext, useState } from 'react';

const ProductsContext = createContext();

const defaultProducts = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    nombre: `Juego ${index + 1}`,
    precio: Math.floor(Math.random() * (599 - 199 + 1)) + 199,
    imagen: '/juego.avif',
    descripcion: `Descripción del juego ${index + 1}. Este es un juego emocionante con gráficos increíbles y una historia cautivadora.`,
    categoria: ['Acción', 'Aventura', 'RPG'][Math.floor(Math.random() * 3)],
    plataforma: ['PS5', 'Xbox Series X', 'Nintendo Switch', 'PC'][Math.floor(Math.random() * 4)],
    stock: Math.floor(Math.random() * 50) + 1,
    slug: `juego-${index + 1}`,
    caracteristicas: [
        'Gráficos en 4K',
        'Modo multijugador',
        'Historia inmersiva',
        'Mundo abierto'
    ],
    lanzamiento: '2024',
    desarrollador: 'Game Studio'
}));

export function ProductsProvider({ children }) {
    const [products] = useState(defaultProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const getFeaturedProducts = () => {
        return products.slice(0, 5);
    };

    const getPaginatedProducts = () => {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        return products.slice(indexOfFirstProduct, indexOfLastProduct);
    };

    const totalPages = Math.ceil(products.length / productsPerPage);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const getProductBySlug = (slug) => {
        return products.find(product => product.slug === slug);
    };

    const getSimilarProducts = (product, limit = 4) => {
        if (!product) return [];
        return products
            .filter(p => 
                p.id !== product.id && 
                (p.categoria === product.categoria || p.plataforma === product.plataforma)
            )
            .slice(0, limit);
    };

    return (
        <ProductsContext.Provider
            value={{
                products,
                getFeaturedProducts,
                getPaginatedProducts,
                currentPage,
                totalPages,
                changePage,
                getProductBySlug,
                getSimilarProducts
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts debe ser usado dentro de un ProductsProvider');
    }
    return context;
};
