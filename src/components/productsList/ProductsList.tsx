import React, { useEffect, useRef } from 'react';
import { Product } from 'src/utils/product';
import { ProductCard } from '../common/product-card/ProductCard';
import styles from './ProductsList.module.css';

export type ProductsListProps = {
  products: Product[];
  onEndReached?: () => void;
  onEditProduct?: (product: Product) => void;
};

export const ProductsList: React.FC<ProductsListProps> = ({ products, onEndReached, onEditProduct }) => {
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
        <div key={product.id} className={styles.item}>
          <ProductCard {...product} />
          {onEditProduct && (
            <button type="button" className={styles.editButton} onClick={() => onEditProduct(product)}>
              Редактировать
            </button>
          )}
        </div>
      ))}
      {onEndReached && <div ref={loaderRef} style={{ height: 1 }} />}
    </div>
  );
};
