import express from "express";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
