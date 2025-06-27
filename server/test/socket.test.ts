import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { io as Client } from 'socket.io-client'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import initSocket from '../src/socket/index.js'

dotenv.config()

describe('Socket.io', () => {
  let httpServer: ReturnType<typeof createServer>
  let io: Server
  let clientSocket: any
  const port = 3005
  const lobbyId = 'lobby-123'
  const userId = 'user1'
  const jwtKey = process.env.JWTKEY!

  beforeAll(async () => {
    httpServer = createServer()
    io = initSocket(httpServer)

    await new Promise<void>((resolve) => {
      httpServer.listen(port, resolve)
    })

    const token = jwt.sign({ id: userId }, jwtKey)
    clientSocket = Client(`http://localhost:${port}`, {
      auth: { token },
      transports: ['websocket']
    })
  }, 10000)

  afterAll(async () => {
    clientSocket.close()
    io.close()
    httpServer.close()
  })

  it('broadcasts playerJoined on joinLobby', async () => {
    await new Promise<void>((resolve) => {
      clientSocket.on('connect', () => {
        clientSocket.emit('joinLobby', lobbyId)
      })

      clientSocket.on('playerJoined', (payload: any) => {
        expect(payload).toEqual({ userId })
        resolve()
      })
    })
  })
})
