import { APIGatewayProxyHandler } from "aws-lambda";
import getProductsById from "../../src/products/get-products-by-id";
import createResponse, {
  createErrorResponse,
  createExceptionResponse,
} from "./models/create-response";

export const productPathParameter = "productId";

export const handler: APIGatewayProxyHandler = async (event) => {
  const productId = event.pathParameters?.[productPathParameter];

  console.log("Executing getProductsById with productId: ", productId);

  try {
    const product = productId ? await getProductsById(productId) : undefined;

    if (product) {
      return createResponse(200, product);
    }

    return createErrorResponse(404, "Product not found");
  } catch (e) {
    return createExceptionResponse(e);
  }
};
