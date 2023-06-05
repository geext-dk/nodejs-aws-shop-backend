import { aws_apigateway, aws_lambda_nodejs } from "aws-cdk-lib";
import { Construct } from "constructs";
import { productPathParameter } from "./products-service.get-products-by-id";

export class ProductsService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const getProductsListFunction = new aws_lambda_nodejs.NodejsFunction(this, "get-products-list");

    const getProductsByIdFunction = new aws_lambda_nodejs.NodejsFunction(
      this,
      "get-products-by-id"
    );

    const api = new aws_apigateway.RestApi(this, "products-service-api", {
      restApiName: "Products Service API",
      description: "This service serves products",
      deployOptions: {
        stageName: "dev",
      },
      defaultCorsPreflightOptions: {
        allowOrigins: ["http://localhost:3000", "https://d27e0q4jstsyvl.cloudfront.net"],
      },
    });

    const getProductsListResource = api.root.addResource("products");

    getProductsListResource.addMethod(
      "GET",
      new aws_apigateway.LambdaIntegration(getProductsListFunction)
    );

    const getProductResource = getProductsListResource.addResource(`{${productPathParameter}}`);

    getProductResource.addMethod(
      "GET",
      new aws_apigateway.LambdaIntegration(getProductsByIdFunction)
    );
  }
}
