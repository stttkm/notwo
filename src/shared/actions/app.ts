import { ipc } from "@/ipc/manager";

export const getPlatform = () => ipc.client.app.currentPlatfom();
export const getAppVersion = () => ipc.client.app.appVersion();
