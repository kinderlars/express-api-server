import AWS from 'aws-sdk';
import {awsConfig, credentials} from '../ressources/aws.config.js';

AWS.config.credentials = credentials;
const docClient = new AWS.DynamoDB.DocumentClient(awsConfig);
const tableName = "express-products"

export function getProducts(){

    // Checkout promisfy middleware
    return new Promise((resolve,reject) => {
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
                    console.log("Found item")
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

export function createProduct(product){
    return new Promise((resolve,reject) => {
        const params = {
            TableName: tableName,
            Item: product
        }

        docClient.put(params, (err, data) =>{
            if (err){
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                reject(err)
            }
            else{
                console.log("Added item:", JSON.stringify(data, null, 2));
                resolve("Product added to database")
            }
        })


    })
}
