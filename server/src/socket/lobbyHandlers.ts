import { Socket, Server } from "socket.io";

export const registerLobbyHandlers = (io: Server, socket: Socket) => {
    socket.on('joinLobby', (lobbyId: any) => {
        socket.join(lobbyId);
        io.to(lobbyId).emit('playerJoined', {
            userId: socket.user?.id
         });
    })

    socket.on('leaveLobby', (lobbyId: any) => {
        socket.leave(lobbyId);
        io.to(lobbyId).emit('playerLeft', {
            userId: socket.user?.id
         });
    })

    socket.on('disconnect', () => {
        console.log(`User ${socket.user?.id} disconnected`);
    })
}