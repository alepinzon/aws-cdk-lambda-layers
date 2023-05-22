#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyCdkLambdaStack } from '../lib/my-cdk-lambda-stack'
import { MyCdkLambdaLayerStack } from '../lib/my-cdk-lambda-layer-stack';

const app = new cdk.App();
new MyCdkLambdaStack(app, 'MyCdkLambdaStack', {
  // env: { account: '123456789012', region: 'us-east-1' },
});
new MyCdkLambdaLayerStack(app, 'MyCdkLambdaLayerStack', {
  // env: { account: '123456789012', region: 'us-east-1' },
});