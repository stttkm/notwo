import { ClientContext, createORPCClient } from "@orpc/client";

import { IPC_CHANNELS } from "@/shared/constants";
import { RPCLink } from "@orpc/client/message-port";
import { RouterClient } from "@orpc/server";
import { router } from "./router";

type RPCClient = RouterClient<typeof router>;

declare global {
  interface Window {
    __IPC_MANAGER__?: IPCManager;
  }
}

class IPCManager {
  private readonly clientPort: MessagePort;
  private readonly serverPort: MessagePort;

  private readonly rpcLink: RPCLink<ClientContext>;

  public readonly client: RPCClient;

  private initialized: boolean = false;

  constructor() {
    const { port1: clientChannelPort, port2: serverChannelPort } =
      new MessageChannel();
    this.clientPort = clientChannelPort;
    this.serverPort = serverChannelPort;

    this.rpcLink = new RPCLink({
      port: this.clientPort,
    });
    this.client = createORPCClient(this.rpcLink);
  }

  public initialize() {
    if (this.initialized) return;
    
    this.clientPort.start();

    window.postMessage(IPC_CHANNELS.START_ORPC_SERVER, "*", [this.serverPort]);
    this.initialized = true;
  }
}

// Persist the IPC manager across HMR to prevent connection issues
function getIPCManager(): IPCManager {
  if (!window.__IPC_MANAGER__) {
    window.__IPC_MANAGER__ = new IPCManager();
    window.__IPC_MANAGER__.initialize();
  }
  return window.__IPC_MANAGER__;
}

export const ipc = getIPCManager();
