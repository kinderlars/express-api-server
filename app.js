import express from 'express';
import { IndexRouter } from './controllers/v0/index.router.js';

const API_PATH_V0 = "/api/v0";
const ROUTES_PATH_V0 = "./routes/v0";

//init express
const app = express();
app.set('view engine', 'pug');

// app.set("view engine","pug");

// Use the body parser middleware for post requests
app.use(express.static(process.cwd()+"/public"));

app.use(`${API_PATH_V0}/`, IndexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`));