import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { ProductsService } from "./products-service";

export class CdkBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ProductsService(this, "products-service");
  }
}
