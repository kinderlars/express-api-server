import express from 'express';
import { IndexRouter } from './controllers/v0/index.router';

const API_PATH_V0 = "/api/v0";
const ROUTES_PATH_V0 = "./routes/v0";


//init express
const app = express();
const port = process.env.PORT || 3000;

// Start the Server
app.listen( port, () => {
  console.log( `server running http://localhost:${ port }${API_PATH_V0}` );
  console.log( `press CTRL+C to stop server` );
} );

app.use(`${API_PATH_V0}/`, IndexRouter);

const PORT = process.env.PORT || 3000;

