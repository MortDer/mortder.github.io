import React, { useEffect, useRef } from 'react';
import { Product } from 'src/utils/product';
import { ProductCard } from '../common/product-card/ProductCard';
import styles from './ProductsList.module.css';

export type ProductsListProps = {
  products: Product[];
  onEndReached?: () => void;
};

export const ProductsList: React.FC<ProductsListProps> = ({ products, onEndReached }) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!onEndReached || !loaderRef.current || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onEndReached();
          }
        });
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [onEndReached]);

  return (
    <div className={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
      {onEndReached && <div ref={loaderRef} style={{ height: 1 }} />}
    </div>
  );
};
