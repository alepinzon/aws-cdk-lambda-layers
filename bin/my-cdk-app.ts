#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyCdkLambdaStack } from '../lib/my-cdk-lambda-stack'

const app = new cdk.App();
new MyCdkLambdaStack(app, 'MyCdkLambdaStack', {
  // env: { account: '123456789012', region: 'us-east-1' },
});