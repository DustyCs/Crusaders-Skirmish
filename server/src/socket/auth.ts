import jwt, { JwtPayload } from "jsonwebtoken";

const authenticateSocket = (socket: any, next: any) => {
    try{
        const token = socket.handshake.auth.token;
        if (!token) throw new Error('No auth token found');

        const decoded = jwt.verify(token, process.env.JWTKEY!);
        // socket.user = { id: decoded.id };
        socket.user = { id: (decoded as JwtPayload).id };
        next();
    } catch (error) {
        next(new Error('Authentication error'));
    }
}

export default authenticateSocket