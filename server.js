import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import { theNotesDB } from "./db/conn.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/", router);

app.listen(port, async () => {
  await theNotesDB();
  console.log(`Server is running on port ${port}`);
});
