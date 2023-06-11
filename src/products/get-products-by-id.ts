import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docDbClient } from "../dbClient";
import { ProductModel } from "./product.model";

export default async function getProductsById(id: string): Promise<ProductModel | undefined> {
  const command = new GetCommand({
    TableName: "products",
    Key: {
      id,
    },
  });

  const response = await docDbClient.send(command);

  return response.Item as ProductModel | undefined;
}
