import { APIGatewayProxyHandler } from "aws-lambda";
import getProductsList from "../../src/products/get-products-list";
import createResponse, { createExceptionResponse } from "./models/create-response";

export const handler: APIGatewayProxyHandler = async () => {
  console.log("Executing getProductsList");

  try {
    const products = await getProductsList();

    return createResponse(200, products);
  } catch (e) {
    return createExceptionResponse(e);
  }
};
