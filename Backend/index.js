import express from "express";
import { PORT } from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./routes/booksRoute.js";
import cors from 'cors'


dotenv.config();

const app = express();

//middleware for parsing rerquest body
app.use(express.json());

//middleware for handling CORS
app.use(cors())


app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("welcomeee");
});
app.use("/books", bookRoutes);

// console.log(PORT);
// console.log(process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("app connect to dataBase");
    app.listen(PORT, () => {
      console.log(`app listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
