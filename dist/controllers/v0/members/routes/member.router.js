"use strict";
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
exports.MemberRouter = void 0;
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const uuid = __importStar(require("uuid"));
const router = express_1.Router();
router.use(body_parser_1.default.json());
/* Temporary storage for testing only */
let members = [];
/* GET test member. */
router.get('/test', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        "id": 1,
        "firstname": "Peter",
        "surname": "Griffin",
        "email": "Test@test.com",
        "status": "active"
    });
}));
/* GET all users, if exists */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let queryParam = req.query;
    if (members.length === 0) {
        return res.status(400).send({ message: "No data found!" });
    }
    // Checking for params === {} will not work
    if (Object.keys(queryParam).length === 0) {
        return res.status(200).json(members).send();
    }
    const member = findUserByParam(queryParam);
    if (typeof member === 'undefined') {
        return res.status(400).send({ message: `No entry found that matches the query parameter ${Object.keys(queryParam)}` });
    }
    console.log(member);
    res.status(200).json(member).send();
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { id } = req.params;
        console.log(id);
        const member = findUserById(id);
        res.status(200).send(member);
    }
    catch (e) {
        console.error(e.message);
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let queryParam = req.query;
        console.log(queryParam);
        res.status(200);
    }
    catch (e) {
        console.error(e.message);
    }
}));
/* POST new user, and add uuid as id */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Empty payload" });
    }
    const id = uuid.v4();
    const member = {
        id: id,
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        status: req.body.status
    };
    members.push(member);
    res.status(200).send(member);
}));
function findUserById(id) {
    console.log(id);
    return members.find(value => value.id === id);
}
/**
 * Function that takes request parameters and filters members for a match
 * @param queryParam
 * @returns {[]|*[]}
 */
function findUserByParam(queryParam) {
    const qParams = queryParam;
    const qKeys = Object.keys(queryParam);
    console.log(`Params ${JSON.stringify(qParams)}`);
    console.log(`Keys ${qKeys}`);
    console.log(`qkey variable has a length of ${qKeys.length}`);
    let result;
    // Processing requests with more than 1 parameters
    if (qKeys.length > 1) {
        console.log(`Multiple params provided ${JSON.stringify(qKeys)}`);
        let preFiltered = members;
        for (let q of qKeys) {
            console.log(`Looping keys, now trying to apply key/value: ${q}/${JSON.stringify(qParams[q])}`);
            preFiltered = preFiltered.filter(value => value[q] === qParams[q]);
            console.log(`Content of preFiltered ${JSON.stringify(preFiltered)}`);
        }
        result = preFiltered;
        return result;
    }
    return members.filter(value => value[qKeys] === qParams[qKeys]);
}
exports.MemberRouter = router;
