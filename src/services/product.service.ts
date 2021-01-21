import AWS from 'aws-sdk';
import {awsConfig, credentials} from '../ressources/aws.config';

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
                let results: any = [];
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

export function getProduct(id){
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames:{
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
        }

        let results: any[] = [];

        docClient.query(params, function(err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function(product) {
                    console.log(`Product found ${JSON.stringify(product)}`);
                    results.push(product)
                });
                resolve(results)
            }
        });
    })
}

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

export function deleteProduct(id){
    return new Promise((resolve,reject) => {
        const params = {
            TableName: tableName,
            Key:{
                "id": id
            }
        }

        console.log("Attempting a conditional delete...");
        docClient.delete(params, function(err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                resolve("Object deleted!")
            }
        });
    })
}
