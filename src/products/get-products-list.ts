import { BatchGetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docDbClient } from "../dbClient";
import { AvailableProductModel, StockModel } from "./product.model";

export default async function getProductsList(): Promise<AvailableProductModel[]> {
  const scanCommand = new ScanCommand({
    TableName: "products",
    Limit: 10,
  });

  const productsResult = await docDbClient.send(scanCommand);

  const products = productsResult.Items as AvailableProductModel[];

  const getStocksCommand = new BatchGetCommand({
    RequestItems: {
      stocks: {
        Keys: products.map((product) => ({
          product_id: product.id,
        })),
      },
    },
  });

  const stocksResult = await docDbClient.send(getStocksCommand);

  const stocks = (stocksResult.Responses?.["stocks"] || []) as StockModel[];

  return products.map((product) => ({
    ...product,
    count: stocks.find((p) => p.product_id === product.id)?.count || 0,
  }));
}
