import AWS from 'aws-sdk';
import { awsConfig } from '../ressources/aws.config.js';

export async function getProducts(){
    const docClient = new AWS.DynamoDB.DocumentClient(awsConfig);
    const tableName = "some-table"

    const params = {
      TableName: tableName
    }

    console.log(`Scanning ${tableName} table.`);
    docClient.scan(params, onScan);

    let results = [];
    
    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            data.Items.forEach((products) => {
                console.log("Table contains objects")
                console.log(
                    JSON.stringify(products));
                results.push(products);
            });
            console.log(JSON.stringify(results))
            
    
            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);

            }
        }
        return new Promise((resolve,reject) => {
            results
        });
    }
};


