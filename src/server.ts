import express from "express";
import cors from "cors";
import { router } from "./infra/http/routes/index.routes";
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(router);


app.listen(5000, () => {
    console.log(`Server running on port: ${PORT}`);
});