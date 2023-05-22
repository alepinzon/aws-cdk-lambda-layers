import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');

export class MyCdkLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'MyLambdaFunction', {
      // functionName: "MyLambdaFunction",
      code: lambda.Code.fromAsset('./lambda/js'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_18_X
    });

    new lambda_nodejs.NodejsFunction(this, 'MyESLambdaFunction', {
      // functionName: 'MyESLambdaFunction',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join('./lambda/ts/index.ts'),
      bundling: {
        minify: false,
        target: 'es2020',
        sourceMap: true,
        sourceMapMode: lambda_nodejs.SourceMapMode.INLINE,
      },
    });

  }
}
