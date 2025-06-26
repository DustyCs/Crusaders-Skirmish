import jwt from "jsonwebtoken";
const authenticateSocket = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token)
            throw new Error('No auth token found');
        const decoded = jwt.verify(token, process.env.JWTKEY);
        // socket.user = { id: decoded.id };
        socket.user = { id: decoded.id };
        next();
    }
    catch (error) {
        next(new Error('Authentication error'));
    }
};
export default authenticateSocket;
