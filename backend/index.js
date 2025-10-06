import express from "express";
import router from "./routes/index.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

//middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
