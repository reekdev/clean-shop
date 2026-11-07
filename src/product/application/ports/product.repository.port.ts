import { Product } from '../../domain/entities/product.entity';
import { ProductId } from '../../domain/value-objects/product-id.vo';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductFilters {
  isActive?: boolean | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
}

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(productId: ProductId): Promise<Product | null>;
  findAll(filters: ProductFilters): Promise<Product[]>;
}
