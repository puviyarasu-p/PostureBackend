import http from "http";
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { initWebSocket } from "./src/websockets/ws.server.js";
import authRoutes from "./src/routes/auth.js";

const server = http.createServer(app);
const wss = initWebSocket(server);

// Inject WS into REST routes
app.use("/auth", authRoutes(wss));

server.listen(process.env.PORT, () => {
  console.log("Server running on : localhost:" + process.env.PORT);
});
