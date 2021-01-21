"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
const express_1 = require("express");
const health_router_1 = require("./health.router");
const member_router_1 = require("./members/routes/member.router");
const products_router_1 = require("./products/routes/products.router");
const router = express_1.Router();
router.use("/health", health_router_1.HealthRouter);
router.use("/members", member_router_1.MemberRouter);
router.use("/products", products_router_1.ProductRouter);
router.get('/', function (req, res, next) {
    res.send('V0');
});
/* GET home page. */
router.get('/index', function (req, res, next) {
    res.send("Index");
});
exports.IndexRouter = router;
