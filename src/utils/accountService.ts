export type UserType = 'Standard' | 'Premium' | 'Gold' | 'Free';
export type ProductType = 'Car' | 'Toy' | 'Food';

type DiscountMap = Record<UserType, number>;
type ProductDiscountMap = Record<UserType, Partial<Record<ProductType, number>>>;

export interface AccountRepository {
  getUserDiscount(userType: UserType): number;
  setUserDiscount(userType: UserType, discount: number): void;
  getProductDiscount(userType: UserType, productType: ProductType): number;
  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void;
}

export class InMemoryAccountRepository implements AccountRepository {
  private readonly userDiscounts: DiscountMap = {
    Standard: 0,
    Premium: 0,
    Gold: 0,
    Free: 0,
  };

  private readonly productDiscounts: ProductDiscountMap = {
    Standard: {},
    Premium: {},
    Gold: {},
    Free: {},
  };

  getUserDiscount(userType: UserType): number {
    return this.userDiscounts[userType] ?? 0;
  }

  setUserDiscount(userType: UserType, discount: number): void {
    this.userDiscounts[userType] = discount;
  }

  getProductDiscount(userType: UserType, productType: ProductType): number {
    return this.productDiscounts[userType][productType] ?? 0;
  }

  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void {
    this.productDiscounts[userType][productType] = discount;
  }
}

export class AccountService {
  private readonly repository: AccountRepository;

  constructor(repository: AccountRepository = new InMemoryAccountRepository()) {
    this.repository = repository;
  }

  setUserDiscount(userType: UserType, discount: number): void {
    AccountService.validateDiscount(discount);
    this.repository.setUserDiscount(userType, discount);
  }

  setProductDiscount(userType: UserType, productType: ProductType, discount: number): void {
    AccountService.validateDiscount(discount);
    this.repository.setProductDiscount(userType, productType, discount);
  }

  getTotalDiscount(userType: UserType, productType: ProductType): number {
    const userDiscount = this.repository.getUserDiscount(userType) ?? 0;
    const productDiscount = this.repository.getProductDiscount(userType, productType) ?? 0;

    return userDiscount + productDiscount;
  }

  getDiscount(userType: UserType, productType: ProductType): number {
    return this.getTotalDiscount(userType, productType);
  }

  private static validateDiscount(discount: number): void {
    if (!Number.isFinite(discount) || discount < 0) {
      throw new Error('Discount must be a non-negative number');
    }
  }
}
