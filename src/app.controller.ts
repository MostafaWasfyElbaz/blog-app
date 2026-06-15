import express from "express";
import { DBConnection } from "./DB/DBConnection";
import baseRouter from "./routes";
import { NextFunction, Request, Response } from "express";
import { IError } from "./common";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";

dotenv.config({
  path: "./config/.env",
});

export const bootstrap = async (): Promise<void> => {
  const app = express();
  app.use(express.json());
  await DBConnection();

  // Swagger Documentation Route
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use("/api/v1", baseRouter);
  app.use("/{*dummy}", (req, res) => {
    res.status(404).json({
      message: "Page not found",
    });
  });
  app.use(
    (
      err: IError,
      req: Request,
      res: Response,
      next: NextFunction,
    ): Response => {
      return res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.statusCode || 500,
        stack: err.stack,
      });
    },
  );
  app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  });
};
