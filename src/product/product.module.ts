import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PRODUCT_REPOSITORY } from './application/ports/product.repository.port';
import { DrizzleProductRepository } from './infrastructure/adapters/drizzle-product.repository';
import { ProductController } from './presentation/product.controller';
import { CommandHandlers } from './application';

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [
    ...CommandHandlers,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: DrizzleProductRepository,
    },
  ],
})
export class ProductModule {}
