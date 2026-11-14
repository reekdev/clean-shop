import { GetProductHandler } from './queries/handlers/get-product.handler';
import { ListProductsHandler } from './queries/handlers/list-products.handler';
import { CreateProductHandler } from './use-cases/create-product/create-product.handler';
import { DeleteProductHandler } from './use-cases/delete-product/delete-product.handler';

export const CommandHandlers = [CreateProductHandler, DeleteProductHandler];

export const QueryHandlers = [ListProductsHandler, GetProductHandler];
