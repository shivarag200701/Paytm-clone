import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    if (!token || token.startsWith("bearer")) {
      return res.status(403).json({ msg: "not authenticated" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.userId);
      req.body.userId = decoded.userId;
      next();
    } catch (err) {
      return res.status(403).json({ msg: "not authenticated" });
    }
  }
}
