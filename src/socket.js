// src/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io("https://farm-app-backend-nm5e.onrender.com", {
    query: { userId },  // 🔥 send userId during connection
    transports: ["websocket"],
  });

  return socket;
};

export const getSocket = () => socket;
