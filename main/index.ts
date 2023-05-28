import { BrowserWindow, app, ipcMain } from "electron";
import path from "path";
import { IpcRecordRegister } from "./ipc/ipcRegister";
import { IpcRequestSignIn } from "./ipc/IpcRequestSignIn";

function createWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, "..", "preload.js"),
    },
    show: false,
  });
  window.loadURL("http://localhost:5173");

  /**
   * Only show if the window is prepared
   */
  window.on("ready-to-show", () => {
    window.show();
  });
  // Remove the menu top-bar on Windows
  window.setMenu(null);
  return window;
}

function loadIpc() {
  const recordManager = new IpcRecordRegister();
  recordManager.addRecord(new IpcRequestSignIn());
  recordManager.records.forEach((record) => {
    switch (record.type) {
      case "on": {
        ipcMain.on(record.channel, record.listener);
        break;
      }

      case "handle": {
        ipcMain.handle(record.channel, record.listener);
        break;
      }
      default:
        throw new Error(`Unexpected record type ${record.type}`);
    }
  });
}

app.whenReady().then(async () => {
  createWindow();
  loadIpc();
});
