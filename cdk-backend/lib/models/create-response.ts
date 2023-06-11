export function createExceptionResponse(error: unknown) {
  return createErrorResponse(500, (error as Error)?.message || "Unknown error");
}

export function createErrorResponse(
  statusCode: number,
  errorMessage: string,
  errors: unknown[] | undefined = undefined
) {
  return createResponse(statusCode, {
    errorMessage,
    errors,
  });
}

export default function createResponse(statusCode: number, body: object | undefined = undefined) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
}
