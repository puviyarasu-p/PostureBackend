import { WebSocketServer } from "ws";

export function initWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    console.log("WS client connected:", req.socket.remoteAddress);

    ws.on("message", (msg) => {
      console.log("WS →", msg.toString());
    });

    ws.on("close", () => {
      console.log("WS client disconnected");
    });

    ws.on("error", (err) => {
      console.error("WS error:", err.message);
    });
  });

  return wss;
}
