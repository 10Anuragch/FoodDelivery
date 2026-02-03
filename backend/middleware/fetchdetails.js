
import jwt from "jsonwebtoken";

const jwtSecret = "HaHa";

const fetch = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Invalid Auth Token" });

  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid Auth Token" });
  }
};

export default fetch;
