import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(router);

export default router;
