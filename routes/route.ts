import "dotenv/config";
import "../config/filealias";
import "@Config/database";
import express, { Express, Request, Response } from "express";
import { authorize, checkRole } from "@Middlewares/authorization";
import { routeNotFound } from "@Middlewares/routeNotFound";
import swaggerUI from "swagger-ui-express";
import carsRouter from "@Routes/Cars/CarsRoute";
import usersRouter from "@Routes/Users/UsersRoute";
import authRouter from "@Routes/Auth/AuthRoute";
import cors from "cors";
import YAML from "yamljs";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    message:
      "Hai, lihatlah ini Restful API Challenge SYNRGY 7",
  });
});

app.use(
  "/api/docs",
  swaggerUI.serve,
  swaggerUI.setup(YAML.load("api-ch8-synrgy-ansyarullah-docs.yaml"))
); // Dokumentasi API

app.use("/api/cars", carsRouter); //Cars Router
app.use("/api/users", [authorize, checkRole(["SUPERADMIN"])], usersRouter); //Users Router
app.use("/api", authRouter); //Auth Router
app.use(routeNotFound); // Custom Route Not Found

export default app;