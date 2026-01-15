import { ipcContext } from "../context";
import { os } from "@orpc/server";

export const minimizeWindow = os
  .use(ipcContext.mainWindowContext)
  .handler(({ context }) => {
    const { window } = context;

    window.minimize();
  });

export const maximizeWindow = os
  .use(ipcContext.mainWindowContext)
  .handler(({ context }) => {
    const { window } = context;
    window[window.isMaximized() ? "unmaximize" : "maximize"]();
  });

export const closeWindow = os
  .use(ipcContext.mainWindowContext)
  .handler(({ context }) => {
    const { window } = context;
    window.close();
  });
