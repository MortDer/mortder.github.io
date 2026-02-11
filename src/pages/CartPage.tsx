import React, { useMemo, useState } from 'react';
import { CartProductsList } from 'src/components/cartProductsList/CartProductsList';
import { Product, createRandomProduct } from 'src/utils/product';
import styles from './Pages.module.css';

export const CartPage: React.FC = () => {
  const initialCartProducts = useMemo(
    () => Array.from({ length: 4 }, () => createRandomProduct(new Date().toISOString())),
    []
  );
  const [cartProducts, setCartProducts] = useState<Product[]>(initialCartProducts);

  const onRemoveProduct = (productId: string) => {
    setCartProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Корзина</h1>
      <p className={styles.subtitle}>Для корзины используется отдельный компонент списка товаров.</p>
      <CartProductsList products={cartProducts} onRemoveProduct={onRemoveProduct} />
    </section>
  );
};
