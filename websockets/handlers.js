const clients = new Map(); // userId -> ws

export function handleMessage(ws, data) {
  let msg;

  try {
    msg = JSON.parse(data.toString());
  } catch {
    return;
  }

  switch (msg.type) {
    case "ping":
      ws.send(JSON.stringify({ type: "pong" }));
      
      break;

    case "auth":
      ws.send(JSON.stringify({ type: "auth_ok" }));
      break;

    default:
      ws.send(
        JSON.stringify({
          type: "echo",
          payload: msg,
        })
      );
  }
}

export function registerClient(userId, ws) {
  ws.userId = userId;
  clients.set(userId, ws);
}

export function unregisterClient(ws) {
  if (ws.userId) clients.delete(ws.userId);
}

export function getClient(userId) {
  return clients.get(userId);
}
