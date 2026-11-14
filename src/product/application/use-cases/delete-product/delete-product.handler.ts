import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, IQueryHandler } from '@nestjs/cqrs';
import {
  ApplicationException,
  ApplicationExceptionCode,
} from '../../../../shared/domain/exceptions/application.exception';
import { ProductId } from '../../../domain/value-objects/product-id.vo';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../../ports/product.repository.port';

import { DeleteProductCommand } from './delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<
  DeleteProductCommand,
  void
> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    const productId = new ProductId(command.id);
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new ApplicationException(
        `Product with id ${command.id} was not found.`,
        ApplicationExceptionCode.NOT_FOUND,
      );
    }

    await this.productRepository.delete(productId);
  }
}
