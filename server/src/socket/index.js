import { Server } from "socket.io";
import authenticateSocket from "./auth.js";
import { registerLobbyHandlers } from "./lobbyHandlers.js";
const initSocket = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });
    io.use(authenticateSocket);
    io.on("connection", (socket) => {
        console.log(`User ${socket.user?.id} connected`); // extended type on socket.d.ts
        registerLobbyHandlers(io, socket);
    });
    return io;
};
export default initSocket;
