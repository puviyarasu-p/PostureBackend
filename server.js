import http from "http";
import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { initWebSocket } from "./src/websockets/ws.server.js";
import loginRoutes from "./src/routes/login.js";

const server = http.createServer(app);
const wss = initWebSocket(server);

app.use("/", loginRoutes(wss));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
