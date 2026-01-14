import express from "express";
import crypto from "crypto";

const router = express.Router();

export default function loginRoutes(wss) {
  router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // ✅ Simple validation (replace with DB check)
    if (username !== "admin" || password !== "admin") {
      return res.status(401).send("Invalid credentials");
    }

    // ✅ Generate token
    const token = crypto.randomBytes(16).toString("hex");

    const payload = {
      type: "LOGIN_SUCCESS",
      token,
      userId: username,
      time: Date.now(),
    };

    // ✅ Push to WebSocket clients (Unity)
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(payload));
      }
    });

    // ✅ Respond to browser
    res.send("Login successful. You can return to the app.");
  });

  return router;
}
