import express from "express";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import session from "express-session";

import router from "./router";

const corsOptions: CorsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

const app = express();

// Разрешение доступа с любого домена
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(session({ secret: "auth", resave: false, saveUninitialized: false }));

app.use("/", router());

app.listen(8080, () => {
  console.log(`Сервер запущен на порту 8080`);
});
