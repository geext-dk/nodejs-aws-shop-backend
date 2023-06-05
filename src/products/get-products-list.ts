import { AvailableProductModel } from "./product.model";
import { productsMockData } from "./products.mock-data";

export default async function getProductsList(): Promise<AvailableProductModel[]> {
  return productsMockData;
}
