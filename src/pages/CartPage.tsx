import React from 'react';
import { CartProductsList } from 'src/components/cartProductsList/CartProductsList';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectCartProducts } from 'src/store/selectors';
import { removeFromCart } from 'src/store/slices/cartSlice';
import styles from './Pages.module.css';

export const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCartProducts);

  const onRemoveProduct = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Корзина</h1>
      <p className={styles.subtitle}>Товары в корзине хранятся в Redux и удаляются по кнопке в карточке.</p>
      <CartProductsList products={cartProducts} onRemoveProduct={onRemoveProduct} />
    </section>
  );
};
