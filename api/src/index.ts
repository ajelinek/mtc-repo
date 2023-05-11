import express from 'express'
import { mountSockets, mountTRPCServer } from './server'
import cors from 'cors'
import http from 'http'
import { myServer } from './types'
import { Server } from 'socket.io'

const app = express()
app.use(cors())
mountTRPCServer(app)

app.use('/api', (req, res) => {
  res.send('Hello World!')
})

const server = http.createServer(app)
export const io: myServer = new Server(server, {
  cors: {
    origin: '*'
  }
})

mountSockets(io)

server.listen(2021, () => {
  console.log('Server started on port 2021')
})

export type { AppRouterDefinition } from './routers'
