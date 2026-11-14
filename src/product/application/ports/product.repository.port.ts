import { Product } from '../../domain/entities/product.entity';
import { ProductId } from '../../domain/value-objects/product-id.vo';
import { Sku } from '../../domain/value-objects/sku.vo';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductFilters {
  isActive?: boolean | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
}

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(productId: ProductId): Promise<Product | null>;
  findBySku(sku: Sku): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findAll(filters: ProductFilters): Promise<Product[]>;
  delete(id: ProductId): Promise<void>;
}
