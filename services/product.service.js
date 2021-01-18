import AWS from 'aws-sdk';
import {awsConfig, credentials} from '../ressources/aws.config.js';

AWS.config.credentials = credentials;
const docClient = new AWS.DynamoDB.DocumentClient(awsConfig);

export function getProducts(){

    // Checkout promisfy middleware
    return new Promise((resolve,reject) => {
        const tableName = "express-products"
        const params = {
            TableName: tableName
        }

        console.log(`Scanning ${tableName} table.`);
        docClient.scan(params, onScan);

        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:",
                    JSON.stringify(err, null, 2));
                reject(err)
            } else {
                let results = [];
                data.Items.forEach((product) => {
                    console.log("Table contains objects")
                    console.log(
                        JSON.stringify(product));
                    results.push(product)

                })
                resolve(results)
                // // continue scanning if we have more movies, because
                // // scan can retrieve a maximum of 1MB of data
                // if (typeof data.LastEvaluatedKey != "undefined") {
                //     console.log("Scanning for more...");
                //     params.ExclusiveStartKey = data.LastEvaluatedKey;
                //     docClient.scan(params, onScan);
                //
                // }
            }
        }
    });
};


