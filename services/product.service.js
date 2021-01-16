import * as AWS from 'aws-sdk';
import { awsConfig } from '../ressources/aws.config.js';
// import { dynamodbConfig } from '../ressources/dynamodb.config.js';

export class ProductService {
  constructor() {
    const docClient = new AWS.DynamoDB.DocumentClient(awsConfig);
  }
  getProducts(){
    const params = {
      TableName: "NAME"
    }

    docClient.get(params, (err, data) => {
      if (err) {
        console.log(err)
        res.send({
          success: false,
          message: err
        });
      } else {
        const { Items } = data;
        res.send({
          success: true,
          product: Items
        });
      }
    })

  }

}


