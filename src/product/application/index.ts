import { ListProductsHandler } from './queries/handlers/list-products.handler';
import { CreateProductHandler } from './use-cases/create-product/create-product.handler';

export const CommandHandlers = [CreateProductHandler];

export const QueryHandlers = [ListProductsHandler];
