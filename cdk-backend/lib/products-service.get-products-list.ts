import { APIGatewayProxyHandler } from "aws-lambda";
import getProductsList from "../../src/products/get-products-list";

export const handler: APIGatewayProxyHandler = async () => {
  const products = await getProductsList();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(products),
  };
};
