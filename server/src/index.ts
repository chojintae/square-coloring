import express from "express";
import { list_names, load, save } from './routes';
import bodyParser from 'body-parser';


// Configure and start the HTTP server.
const port = 8088;
const app = express();
app.use(bodyParser.json());
app.post("/api/save", save);
app.get("/api/load", load);
app.get("/api/list_names", list_names)
app.listen(port, () => console.log(`Server listening on ${port}`));