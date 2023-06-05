import { APIGatewayEvent, Handler } from "aws-lambda";
import getProductsById from "../../src/products/get-products-by-id";

export const productPathParameter = "productId";

export const handler: Handler = async (event: APIGatewayEvent) => {
  const productId = event.pathParameters?.[productPathParameter];
  const product = productId ? await getProductsById(productId) : undefined;

  if (product) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(product),
    };
  }

  return {
    statusCode: 404,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
