import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Modal } from 'src/components/common/modal/Modal';
import { ProductsList } from 'src/components/productsList/ProductsList';
import { useAppDispatch, useAppSelector } from 'src/store';
import { selectCartProducts, selectIsAdmin, selectProducts } from 'src/store/selectors';
import { addToCart, removeFromCart } from 'src/store/slices/cartSlice';
import { addProduct, updateProduct } from 'src/store/slices/productsSlice';
import { Product } from 'src/utils/product';
import { v4 as uuidv4 } from 'uuid';
import styles from './Pages.module.css';

type ProductFormValues = {
  name: string;
  desc: string;
  price: string;
  categoryName: string;
  photo: string;
};

const EMPTY_PRODUCT_FORM: ProductFormValues = {
  name: '',
  desc: '',
  price: '',
  categoryName: '',
  photo: '',
};

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const cartProducts = useAppSelector(selectCartProducts);
  const isAdmin = useAppSelector(selectIsAdmin);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formValues, setFormValues] = useState<ProductFormValues>(EMPTY_PRODUCT_FORM);
  const [searchParams, setSearchParams] = useSearchParams();
  const isModalVisible = isAdmin && searchParams.has('modal');
  const cartProductIds = cartProducts.map((product) => product.id);

  useEffect(() => {
    if (isAdmin || !searchParams.has('modal')) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('modal');
    nextParams.delete('productId');
    setSearchParams(nextParams);
  }, [isAdmin, searchParams, setSearchParams]);

  const openCreateModal = () => {
    if (!isAdmin) {
      return;
    }

    setEditingProduct(null);
    setFormValues(EMPTY_PRODUCT_FORM);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('modal', 'create');
    nextParams.delete('productId');
    setSearchParams(nextParams);
  };

  const openEditModal = (product: Product) => {
    if (!isAdmin) {
      return;
    }

    setEditingProduct(product);
    setFormValues({
      name: product.name,
      desc: product.desc ?? '',
      price: String(product.price),
      categoryName: product.category.name,
      photo: product.photo,
    });
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('modal', 'edit');
    nextParams.set('productId', product.id);
    setSearchParams(nextParams);
  };

  const closeModal = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('modal');
    nextParams.delete('productId');
    setSearchParams(nextParams);
  };

  const onFormFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const fieldName = name as keyof ProductFormValues;
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedPrice = Number(formValues.price);

    if (!formValues.name.trim() || !formValues.categoryName.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      return;
    }

    const nextProduct: Product = {
      id: editingProduct?.id ?? uuidv4(),
      name: formValues.name.trim(),
      desc: formValues.desc.trim() || undefined,
      createdAt: editingProduct?.createdAt ?? new Date().toISOString(),
      oldPrice: parsedPrice * 1.2,
      price: parsedPrice,
      photo: formValues.photo.trim() || 'https://placehold.co/600x400',
      category: {
        id: editingProduct?.category.id ?? uuidv4(),
        name: formValues.categoryName.trim(),
      },
    };

    if (!editingProduct) {
      dispatch(addProduct(nextProduct));
    } else {
      dispatch(updateProduct(nextProduct));
    }
    closeModal();
  };

  const onAddProductToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const onRemoveProductFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <section className={styles.page}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>Товары</h1>
        {isAdmin && (
          <button type="button" className={styles.primaryButton} onClick={openCreateModal}>
            Добавить товар
          </button>
        )}
      </div>
      <p className={styles.subtitle}>
        Список товаров в Redux. Добавление/редактирование через модальное окно доступно только администратору.
      </p>

      <ProductsList
        products={products}
        onEditProduct={openEditModal}
        onAddToCart={onAddProductToCart}
        onRemoveFromCart={onRemoveProductFromCart}
        cartProductIds={cartProductIds}
        canEditProducts={isAdmin}
      />

      <Modal visible={isModalVisible} onClose={closeModal}>
        <h3 className={styles.modalTitle}>{editingProduct ? 'Редактирование товара' : 'Создание товара'}</h3>
        <form className={styles.form} onSubmit={onSubmit}>
          <label className={styles.label}>
            Название
            <input className={styles.input} name="name" value={formValues.name} onChange={onFormFieldChange} required />
          </label>
          <label className={styles.label}>
            Описание
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              name="desc"
              value={formValues.desc}
              onChange={onFormFieldChange}
            />
          </label>
          <label className={styles.label}>
            Цена
            <input
              className={styles.input}
              name="price"
              type="number"
              min={1}
              value={formValues.price}
              onChange={onFormFieldChange}
              required
            />
          </label>
          <label className={styles.label}>
            Категория
            <input
              className={styles.input}
              name="categoryName"
              value={formValues.categoryName}
              onChange={onFormFieldChange}
              required
            />
          </label>
          <label className={styles.label}>
            Ссылка на фото
            <input className={styles.input} name="photo" value={formValues.photo} onChange={onFormFieldChange} />
          </label>
          <div className={styles.actions}>
            <button type="submit" className={styles.primaryButton}>
              {editingProduct ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};
