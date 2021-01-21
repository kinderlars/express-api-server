import AWS from 'aws-sdk';

export const credentials = new AWS.SharedIniFileCredentials({profile:"xyz"});

export const awsConfig = {
  'apiVersion': '2012-08-10',
  "region": "eu-central-1",
  'endpoint': "https://dynamodb.eu-central-1.amazonaws.com"
}