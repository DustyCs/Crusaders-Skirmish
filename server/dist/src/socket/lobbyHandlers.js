export const registerLobbyHandlers = (io, socket) => {
    socket.on('joinLobby', (lobbyId) => {
        socket.join(lobbyId);
        io.to(lobbyId).emit('playerJoined', {
            userId: socket.user?.id
        });
    });
    socket.on('leaveLobby', (lobbyId) => {
        socket.leave(lobbyId);
        io.to(lobbyId).emit('playerLeft', {
            userId: socket.user?.id
        });
    });
    socket.on('disconnect', () => {
        console.log(`User ${socket.user?.id} disconnected`);
    });
};
