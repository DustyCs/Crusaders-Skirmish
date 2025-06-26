import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest'
import request from 'supertest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { app } from '../src/app.js'
import { User } from '../src/models/User.js'
import bcrypt from 'bcrypt'

// We'll hold the reference to the in-memory MongoDB
let mongoServer: MongoMemoryServer

beforeAll(async () => {
  // Spin up the in-memory Mongo server
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
})

beforeEach(async () => {
  // Clear all data before each test
  await User.deleteMany({})
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Authentication API', () => {
  it('registers a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', username: 'tester', password: '123456' })
      .expect(201)

    expect(res.body).toHaveProperty('message', 'User registered successfully')
    const userInDb = await User.findOne({ email: 'test@example.com' })
    expect(userInDb).not.toBeNull()
    expect(userInDb!.username).toBe('tester')
  })

  it('returns 400 if user already exists', async () => {
    await User.create({ email: 'dup@example.com', username: 'dupuser', passwordHash: await bcrypt.hash('pw', 10) })
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'dup@example.com', username: 'another', password: '123456' })
      .expect(400)

    expect(res.body).toHaveProperty('message', 'Email already exists')
  })

  it('returns 401 for wrong password on login', async () => {
    await User.create({ email: 'wrongpw@example.com', username: 'user1', passwordHash: await bcrypt.hash('rightpw', 10) })
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'wrongpw@example.com', password: 'wrongpw' })
      .expect(401)

    expect(res.body).toHaveProperty('message', 'Invalid password')
  })

  it('logs in successfully and returns JWTs', async () => {
    const hashedPassword = await bcrypt.hash('123456', 10)
    await User.create({ email: 'valid@example.com', username: 'validuser', passwordHash: hashedPassword })

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'valid@example.com', password: '123456' })
      .expect(200)

    expect(res.body).toHaveProperty('accessToken')
    expect(res.body).toHaveProperty('refreshToken')
  })

  it('rejects invalid refresh tokens', async () => {
    const res = await request(app)
      .post('/api/auth/refresh')
      .send({ refreshToken: 'invalidtoken' })
      .expect(400)

    expect(res.body).toHaveProperty('message', 'Invalid refresh token')
  })
})
