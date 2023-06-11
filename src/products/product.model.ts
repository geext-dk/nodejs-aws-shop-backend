export interface ProductModel {
  id: string;
  title: string;
  description?: string;
  price: number;
}

export interface StockModel {
  product_id: string;
  count: number;
}

export interface AvailableProductModel extends ProductModel {
  count: number;
}
