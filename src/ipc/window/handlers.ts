import { ipcContext } from "../context";
import { os } from "@orpc/server";
import { z } from "zod";

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

export const setTrafficLightVisibility = os
  .use(ipcContext.mainWindowContext)
  .input(z.object({ visible: z.boolean() }))
  .handler(({ context, input }) => {
    const { window } = context;
    if (process.platform === "darwin") {
      window.setWindowButtonVisibility(input.visible);
    }
  });
