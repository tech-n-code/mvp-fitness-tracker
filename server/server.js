import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./src/routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.SERVER_PORT || 8000;

app.use('/api', router);

app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});