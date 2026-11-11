export class CreateProductCommand {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly sku: string,
    readonly price: number,
    readonly currency: string,
    readonly stock: number,
  ) {}

  
}
