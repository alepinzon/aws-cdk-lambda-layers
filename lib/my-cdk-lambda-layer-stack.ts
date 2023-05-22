import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require('path');
import { RemovalPolicy } from 'aws-cdk-lib';

import * as fs from 'fs';

export class MyCdkLambdaLayerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    

    new lambda.LayerVersion(this, 'MyLambaLayer', {
      layerVersionName: 'MyLambaLayer',
      removalPolicy: RemovalPolicy.DESTROY,
      code: lambda.Code.fromAsset('./layers'),
      compatibleArchitectures: [lambda.Architecture.X86_64],
      compatibleRuntimes: [
        lambda.Runtime.NODEJS_14_X,
        lambda.Runtime.NODEJS_16_X,
        lambda.Runtime.NODEJS_18_X,
      ]
    });
    

  }
}
