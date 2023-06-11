import { TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import * as crypto from "crypto";
import { docDbClient } from "../dbClient";
import { ProductModel } from "./product.model";

export default async function createProduct(product: Omit<ProductModel, "id">) {
  const productId = crypto.randomUUID();

  const command = new TransactWriteCommand({
    TransactItems: [
      {
        Put: {
          TableName: "products",
          Item: {
            ...product,
            id: productId,
          },
        },
      },
      {
        Put: {
          TableName: "stocks",
          Item: {
            product_id: productId,
            count: 100,
          },
        },
      },
    ],
  });

  await docDbClient.send(command);

  return product;
}
