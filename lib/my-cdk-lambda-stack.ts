import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

export class MyCdkLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, 'MyLambdaLayer', {
      layerVersionName: 'MyLambdaLayer',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      code: lambda.Code.fromAsset('./layers'),
      compatibleArchitectures: [lambda.Architecture.X86_64],
      compatibleRuntimes: [
        lambda.Runtime.NODEJS_14_X,
        lambda.Runtime.NODEJS_16_X,
        lambda.Runtime.NODEJS_18_X,
      ]
    });

    new lambda.Function(this, 'MyLambdaFunction', {
      // functionName: "MyLambdaFunction",
      code: lambda.Code.fromAsset('./lambda/js'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      logRetention: RetentionDays.ONE_DAY,
      layers:[
        layer
      ]
    });

    let lambdaES = new lambda_nodejs.NodejsFunction(this, 'MyESLambdaFunction', {
      // functionName: 'MyESLambdaFunction',
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join('./lambda/ts/index.ts'),
      logRetention: RetentionDays.ONE_DAY,
      layers:[
        layer
      ],
      bundling: {
        minify: false,
        target: 'es2020',
        sourceMap: true,
        sourceMapMode: lambda_nodejs.SourceMapMode.INLINE,
        externalModules: [
          '@aws-sdk/*',
          'axios'
        ]
      },
    });

    let s3ReadOnlyAccessManagedPolicy = ManagedPolicy.fromAwsManagedPolicyName('AmazonS3ReadOnlyAccess');
    lambdaES.role?.addManagedPolicy(s3ReadOnlyAccessManagedPolicy)

  }
}
