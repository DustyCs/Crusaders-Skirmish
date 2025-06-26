import { describe, it, beforeAll, afterAll, expect } from 'vitest'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { io as Client } from 'socket.io-client'
import initSocket from '../src/socket/index.js'
import jwt from 'jsonwebtoken'

describe('Socket.io', () => {
  let httpServer: ReturnType<typeof createServer>
  let clientSocket: any
  let io: Server

  beforeAll(async () => {
    httpServer = createServer()
    io = initSocket(httpServer)
    await new Promise<void>((resolve) => {
      httpServer.listen(() => {
        const token = jwt.sign({ id: 'user1' }, process.env.JWT_SECRET!)
        clientSocket = Client(`http://localhost:${(httpServer.address() as any).port}`, {
          auth: { token },
        })
        clientSocket.on('connect', resolve)
      })
    })
  })

  afterAll(async () => {
    clientSocket.close()
    io.close()
    httpServer.close()
  })

  it('broadcasts playerJoined on joinLobby', async () => {
    clientSocket.emit('joinLobby', 'test-room')
    await new Promise<void>((resolve) => {
      clientSocket.on('playerJoined', (data: any) => {
        expect(data.userId).toBe('user1')
        resolve()
      })
    })
  })
})