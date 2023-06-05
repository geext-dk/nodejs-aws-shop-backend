import { AvailableProductModel } from "./product.model";
import { productsMockData } from "./products.mock-data";

export default async function getProductsById(
  id: string
): Promise<AvailableProductModel | undefined> {
  return productsMockData.find((p) => p.id === id);
}
