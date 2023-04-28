import { attachControllers } from "@decorators/express";
import dotenv from "dotenv";
import express, { Express } from "express";
import { ExtractController } from "./controllers/extract.controller";
import { register } from "./infra/di";
import { CalculateController } from "./controllers/calculate.controller";

process.env.ROOT_PATH = __dirname;

dotenv.config();
register();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT;
const router = express.Router();
attachControllers(router, [ExtractController, CalculateController]);

app.use('/api', router);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});