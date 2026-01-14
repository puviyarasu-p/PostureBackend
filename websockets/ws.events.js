import {  } from "./ws.clients.js";

export function sendAuthEvent(userId, user) {
  const ws = getClient(userId);
  if (ws?.readyState === 1) {
    ws.send(
      JSON.stringify({
        type: "auth_result",
        user,
      })
    );
  }
}
