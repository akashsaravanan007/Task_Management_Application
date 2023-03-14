import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.use(cors());
// http://localhost:5000/api/user/logon
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
mongoose
  .connect(
    "mongodb+srv://<username>:<password>@mern-apps.dgtsqdb.mongodb.net/?retryWrites=true&w=majority" //provide username and password of your mongodb atlas connection
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
