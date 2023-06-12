import { aws_apigateway, aws_dynamodb, aws_iam, aws_lambda_nodejs } from "aws-cdk-lib";
import { Construct } from "constructs";
import { productPathParameter } from "./products-service.get-products-by-id";

export class ProductsService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const productsTable = new aws_dynamodb.Table(this, "products-table", {
      partitionKey: { name: "id", type: aws_dynamodb.AttributeType.STRING },
      tableName: "products",
    });

    const stocksTable = new aws_dynamodb.Table(this, "stocks-table", {
      partitionKey: { name: "product_id", type: aws_dynamodb.AttributeType.STRING },
      tableName: "stocks",
    });

    const getProductsListFunction = new aws_lambda_nodejs.NodejsFunction(this, "get-products-list");
    getProductsListFunction.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: ["dynamodb:Scan", "dynamodb:BatchGetItem"],
        resources: [productsTable.tableArn, stocksTable.tableArn],
      })
    );

    const createProductFunction = new aws_lambda_nodejs.NodejsFunction(this, "create-product");
    createProductFunction.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: ["dynamodb:PutItem"],
        resources: [productsTable.tableArn, stocksTable.tableArn],
      })
    );

    const getProductsByIdFunction = new aws_lambda_nodejs.NodejsFunction(
      this,
      "get-products-by-id"
    );
    getProductsByIdFunction.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: ["dynamodb:GetItem"],
        resources: [productsTable.tableArn],
      })
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

    getProductsListResource.addMethod(
      "POST",
      new aws_apigateway.LambdaIntegration(createProductFunction)
    );

    const getProductResource = getProductsListResource.addResource(`{${productPathParameter}}`);

    getProductResource.addMethod(
      "GET",
      new aws_apigateway.LambdaIntegration(getProductsByIdFunction)
    );
  }
}
