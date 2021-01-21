"use strict";
/**
 * This router manages product requests
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const uuid = __importStar(require("uuid"));
const body_parser_1 = __importDefault(require("body-parser"));
const product_service_js_1 = require("../../../../services/product.service.js");
/**
 * Create express router to manage incoming requests
 * @type {Router}
 */
const router = express_1.Router();
router.use(body_parser_1.default.json());
let products = [];
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for singelton
    products = yield product_service_js_1.getProducts();
    if (products.length === 0) {
        return res.status(400).send({ message: "No data was found in table" });
    }
    res.status(200).send(products);
    // if(products.length===0){
    //   return res.status(400).send("No products found!")
    // }
    //res.status(200).send(JSON.stringify(products))
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const matches = yield product_service_js_1.getProduct(req.params.id);
    if (matches.length === 0) {
        return res.status(400).send({ message: "No product found with this id" });
    }
    res.status(200).send(matches);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Empty payload" });
    }
    const id = uuid.v4();
    const product = {
        id: id,
        name: req.body.name,
        description: req.body.description,
        vendor: req.body.vendor
    };
    console.log(product);
    const status = yield product_service_js_1.createProduct(product);
    if (!status) {
        res.status(400).send("Product was not added!");
    }
    res.status(200).send("Product was added!");
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // More generic would be to implement !==36
    // TODO: Implement once all old items are removed from Dynamodb table
    // if (id.length < 36){
    //   console.log(`Passed uuid is too short ${id.length}`)
    //   res.status(400).send({message: "The uuid provided seems to be too short"})
    // } else if (id.length >36){
    //   console.log(`Passed uuid is too long ${id.length}`)
    // }
    if (!(yield product_service_js_1.getProduct(id))) {
        res.status(400).send({ message: "No product with this id found" });
    }
    const productsDelete = yield product_service_js_1.deleteProduct(id);
    res.status(200).send({ message: `Product with the id ${id} deleted.` });
}));
exports.ProductRouter = router;
