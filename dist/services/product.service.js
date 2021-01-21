"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const aws_config_1 = require("../ressources/aws.config");
aws_sdk_1.default.config.credentials = aws_config_1.credentials;
const docClient = new aws_sdk_1.default.DynamoDB.DocumentClient(aws_config_1.awsConfig);
const tableName = "express-products";
function getProducts() {
    // Checkout promisfy middleware
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName
        };
        console.log(`Scanning ${tableName} table.`);
        docClient.scan(params, onScan);
        function onScan(err, data) {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                let results = [];
                data.Items.forEach((product) => {
                    console.log("Found item");
                    console.log(JSON.stringify(product));
                    results.push(product);
                });
                resolve(results);
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
}
exports.getProducts = getProducts;
;
function getProduct(id) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": id
            }
        };
        let results = [];
        docClient.query(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                console.log("Query succeeded.");
                data.Items.forEach(function (product) {
                    console.log(`Product found ${JSON.stringify(product)}`);
                    results.push(product);
                });
                resolve(results);
            }
        });
    });
}
exports.getProduct = getProduct;
function createProduct(product) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName,
            Item: product
        };
        docClient.put(params, (err, data) => {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                console.log("Added item:", JSON.stringify(data, null, 2));
                resolve("Product added to database");
            }
        });
    });
}
exports.createProduct = createProduct;
function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: tableName,
            Key: {
                "id": id
            }
        };
        console.log("Attempting a conditional delete...");
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                resolve("Object deleted!");
            }
        });
    });
}
exports.deleteProduct = deleteProduct;
