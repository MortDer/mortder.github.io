import { AccountRepository, AccountService, ProductType, UserType } from './accountService';

describe('AccountService', () => {
  const userTypes: UserType[] = ['Standard', 'Premium', 'Gold', 'Free'];
  const productTypes: ProductType[] = ['Car', 'Toy', 'Food'];

  const createRepositoryMock = (): AccountRepository & {
    getUserDiscount: jest.Mock;
    setUserDiscount: jest.Mock;
    getProductDiscount: jest.Mock;
    setProductDiscount: jest.Mock;
  } => {
    const userDiscounts: Record<UserType, number> = {
      Standard: 0,
      Premium: 0,
      Gold: 0,
      Free: 0,
    };

    const productDiscounts: Record<UserType, Partial<Record<ProductType, number>>> = {
      Standard: {},
      Premium: {},
      Gold: {},
      Free: {},
    };

    return {
      getUserDiscount: jest.fn((userType: UserType) => userDiscounts[userType] ?? 0),
      setUserDiscount: jest.fn((userType: UserType, discount: number) => {
        userDiscounts[userType] = discount;
      }),
      getProductDiscount: jest.fn(
        (userType: UserType, productType: ProductType) =>
          productDiscounts[userType][productType] ?? 0
      ),
      setProductDiscount: jest.fn(
        (userType: UserType, productType: ProductType, discount: number) => {
          productDiscounts[userType][productType] = discount;
        }
      ),
    };
  };

  test('возвращает 0, если скидки не заданы', () => {
    const repository = createRepositoryMock();
    const service = new AccountService(repository);

    expect(service.getTotalDiscount('Standard', 'Car')).toBe(0);
    expect(repository.getUserDiscount).toHaveBeenCalledWith('Standard');
    expect(repository.getProductDiscount).toHaveBeenCalledWith('Standard', 'Car');
  });

  test('устанавливает общие скидки для каждого типа пользователя', () => {
    const repository = createRepositoryMock();
    const service = new AccountService(repository);

    userTypes.forEach((userType, index) => {
      const discount = (index + 1) * 5;
      service.setUserDiscount(userType, discount);

      expect(repository.setUserDiscount).toHaveBeenCalledWith(userType, discount);
      expect(service.getTotalDiscount(userType, 'Food')).toBe(discount);
    });
  });

  test('устанавливает скидки для конкретных типов товара и пользователя', () => {
    const repository = createRepositoryMock();
    const service = new AccountService(repository);

    userTypes.forEach((userType, userIndex) => {
      productTypes.forEach((productType, productIndex) => {
        const discount = userIndex + productIndex + 1;
        service.setProductDiscount(userType, productType, discount);

        expect(repository.setProductDiscount).toHaveBeenCalledWith(userType, productType, discount);
        expect(service.getTotalDiscount(userType, productType)).toBe(discount);
      });
    });
  });

  test('суммирует общую скидку пользователя и скидку товара', () => {
    const repository = createRepositoryMock();
    const service = new AccountService(repository);

    service.setUserDiscount('Premium', 12);
    service.setProductDiscount('Premium', 'Car', 5);

    expect(service.getTotalDiscount('Premium', 'Car')).toBe(17);
  });

  test('выбрасывает ошибку при отрицательной скидке', () => {
    const repository = createRepositoryMock();
    const service = new AccountService(repository);

    expect(() => service.setUserDiscount('Gold', -1)).toThrow('Discount must be a non-negative number');
    expect(() => service.setProductDiscount('Gold', 'Toy', -5)).toThrow(
      'Discount must be a non-negative number'
    );
  });

  test('выбрасывает ошибку при нечисловой скидке', () => {
    const repository = createRepositoryMock();
    const service = new AccountService(repository);

    expect(() => service.setUserDiscount('Gold', Number.NaN)).toThrow(
      'Discount must be a non-negative number'
    );
  });
});
