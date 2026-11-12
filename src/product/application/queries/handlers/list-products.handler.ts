import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Product } from '../../../domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../../ports/product.repository.port';
import { ListProductsQuery } from '../list-products.query';

@QueryHandler(ListProductsQuery)
export class ListProductsHandler implements IQueryHandler<ListProductsQuery> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(query: ListProductsQuery): Promise<Product[]> {
    return this.productRepository.findAll({
      isActive: query.isActive,
      maxPrice: query.maxPrice,
      minPrice: query.minPrice,
    });
  }
}
