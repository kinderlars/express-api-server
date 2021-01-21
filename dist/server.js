"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_router_1 = require("./controllers/v0/index.router");
const API_PATH_V0 = "/api/v0";
const ROUTES_PATH_V0 = "./routes/v0";
//init express
const app = express_1.default();
const port = process.env.PORT || 3000;
// Start the Server
app.listen(port, () => {
    console.log(`server running http://localhost:${port}${API_PATH_V0}`);
    console.log(`press CTRL+C to stop server`);
});
app.use(`${API_PATH_V0}/`, index_router_1.IndexRouter);
const PORT = process.env.PORT || 3000;
