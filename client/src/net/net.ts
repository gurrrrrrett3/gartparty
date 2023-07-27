import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../../../shared/types/socketMessages";
import Logger from "../util/logger";

export default class Net {
  public socket!: Socket<ServerToClientEvents, ClientToServerEvents>;

  constructor() {
    this.init()
  }

  private async init() {

    const config = await fetch((globalThis as any).DEBUG ? "http://localhost:3001/config" : "/config").then(async (res) => await res.json())

    this.socket = io(config);

    this.socket.on("connect", () => {
      Logger.info("Net", "Connected to server");
    });

    this.socket.on("disconnect", () => {
      Logger.info("Net", "Disconnected from server");
    });

    this.socket.on("connect_error", (err) => {
      Logger.error("Net", "Failed to connect to server", err);
    });
  }


}
