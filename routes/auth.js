import express from "express";

const router = express.Router();

export default function authRoutes(wss) {
  router.get("/login", (req, res) => {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: "Token missing" });
    }

    // Example validation (replace with real auth)
    const isValid = token.length > 10;

    if (!isValid) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const payload = {
      type: "LOGIN_SUCCESS",
      token,
      userId: "USER_001",
      time: Date.now(),
    };

    // 🔴 Send to all connected WS clients
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(payload));
      }
    });

    return res.json({ status: "ok" });
  });

  return router;
}
