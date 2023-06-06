import { expect } from "@jest/globals";
import { APIGatewayProxyEvent, Callback, Context } from "aws-lambda";
import { AvailableProductModel } from "../../../src/products/product.model";
import { handler } from "../../lib/products-service.get-products-by-id";

test("Gets products by id", async () => {
  // Arrange
  const apigwProxyEvent: APIGatewayProxyEvent = {
    pathParameters: {
      productId: "1",
    },
  } as unknown as APIGatewayProxyEvent;

  // Act
  const resultPromise = handler(
    apigwProxyEvent,
    undefined as unknown as Context,
    undefined as unknown as Callback
  );

  // Assert
  expect(resultPromise).toBeTruthy();

  if (resultPromise) {
    const result = await resultPromise;

    expect(result.statusCode).toBe(200);

    const body = JSON.parse(result.body) as AvailableProductModel;

    expect(typeof body).toBe("object");
    expect(body).toBeTruthy();

    expect(body.id).toBeTruthy();
    expect(body.price).toBeTruthy();
    expect(body.title).toBeTruthy();
    expect(body.description).toBeTruthy();
    expect(body.count).toBeTruthy();
  }
});

test("Gets products by id couldn't find product", async () => {
  // Arrange
  const apigwProxyEvent: APIGatewayProxyEvent = {
    pathParameters: {
      productId: "100",
    },
  } as unknown as APIGatewayProxyEvent;

  // Act
  const resultPromise = handler(
    apigwProxyEvent,
    undefined as unknown as Context,
    undefined as unknown as Callback
  );

  // Assert
  expect(resultPromise).toBeTruthy();

  if (resultPromise) {
    const result = await resultPromise;

    expect(result.statusCode).toBe(404);
    expect(result.body).toBeFalsy();
  }
});
