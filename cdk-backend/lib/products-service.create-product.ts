import { APIGatewayProxyHandler } from "aws-lambda";
import { z } from "zod";
import createProduct from "../../src/products/create-product";
import createResponse, {
  createErrorResponse,
  createExceptionResponse,
} from "./models/create-response";

const CreateProductSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number(),
});

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log("Executing createProduct with body: ", event.body);

  if (!event.body) {
    return createErrorResponse(400, "Missing body");
  }

  const parseResult = CreateProductSchema.safeParse(JSON.parse(event.body));

  if (!parseResult.success) {
    return createErrorResponse(400, "Validation error", parseResult.error.issues);
  }

  try {
    const products = await createProduct(parseResult.data);

    return createResponse(200, products);
  } catch (e) {
    return createExceptionResponse(e);
  }
};
