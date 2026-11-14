import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers, QueryHandlers } from './application';
import { PRODUCT_REPOSITORY } from './application/ports/product.repository.port';
import { DrizzleProductRepository } from './infrastructure/adapters/drizzle-product.repository';
import { MongoProductRepository } from './infrastructure/adapters/mongo-product.repository';
import { ProductController } from './presentation/product.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    MongoProductRepository,
    DrizzleProductRepository,
    {
      provide: PRODUCT_REPOSITORY,
      // useClass: DrizzleProductRepository,
      inject: [ConfigService, MongoProductRepository, DrizzleProductRepository],
      useFactory: (
        configService: ConfigService,
        mongoRepo: MongoProductRepository,
        drizzleRepo: DrizzleProductRepository,
      ) => {
        return configService.get('DATABASE') === 'mongodb'
          ? mongoRepo
          : drizzleRepo;
      },
    },
  ],
})
export class ProductModule {}
