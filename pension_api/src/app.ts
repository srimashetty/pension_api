import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/", routes);

app.listen(5001, "localhost", () => {
  console.log("listening on port 5001");
});



