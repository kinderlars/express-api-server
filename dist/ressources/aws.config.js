"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsConfig = exports.credentials = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
exports.credentials = new aws_sdk_1.default.SharedIniFileCredentials({ profile: "serverless" });
exports.awsConfig = {
    'apiVersion': '2012-08-10',
    "region": "eu-central-1",
    'endpoint': "https://dynamodb.eu-central-1.amazonaws.com"
};
