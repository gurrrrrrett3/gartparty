import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
import { ClientToServerEvents, ServerToClientEvents } from "../../shared/types/socketMessages"
import Logger from "../../shared/util/logger"

const port = 3001

const app = express()
const server = http.createServer(app)
const socket = new Server<ClientToServerEvents, ServerToClientEvents>(server)

app.disable("x-powered-by")

app.use(cors())

server.listen(port, () => {
    Logger.info("Server", "Ready!")

    socket.on("connect", (socket) => {
        Logger.info(`Net`, `Socket connected: ${socket.id}`)
    })
})

app.get("/config", (req, res) => {
    res.json({
        port,
        host: "localhost"
      })
})
