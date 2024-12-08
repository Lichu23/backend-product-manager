import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import express from "express";
import swaggerUi from "swagger-ui-express";
import db from "./config/db";
import swaggerSpec from "./config/swagger";
import productsRouter from "./router";

//conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate(); //esperar que se conecta a la db

    db.sync(); //en caso de nuevos modelos o columns ir agregandolas

    // console.log(colors.green.bold("Conexion exitosa a la DB"));
  } catch (error) {
    // console.log(error);
    console.log(colors.red("Hubo un error al conectar con la DB"));
  }
}
connectDB();

//Instancia de express
const server = express();

//Permitir conexiones CORS
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS - Url no permitida"));
    }
  },
};
server.use(cors(corsOptions));

//Leer datos de formularios
server.use(express.json());

server.use(morgan("dev"));

//Routing
server.use("/api/products", productsRouter);

//Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
