import { expect } from "@jest/globals";
import { APIGatewayProxyEvent, Callback, Context } from "aws-lambda";
import { AvailableProductModel } from "../../../src/products/product.model";
import { handler } from "../../lib/products-service.get-products-list";
test("Gets products list", async () => {
  // Arrange & Act
  const resultPromise = handler(
    undefined as unknown as APIGatewayProxyEvent,
    undefined as unknown as Context,
    undefined as unknown as Callback
  );

  // Assert
  expect(resultPromise).toBeTruthy();

  if (resultPromise) {
    const result = await resultPromise;

    expect(result.statusCode).toBe(200);

    const body = JSON.parse(result.body) as AvailableProductModel[];

    expect(Array.isArray(body)).toBeTruthy();

    expect(body).toHaveLength(10);
    expect(body[0].id).toBeTruthy();
    expect(body[0].price).toBeTruthy();
    expect(body[0].title).toBeTruthy();
    expect(body[0].description).toBeTruthy();
    expect(body[0].count).toBeTruthy();
  }
});
