import { BrowserWindow, app, ipcMain } from "electron";
import path from "path";
import { IpcRecordRegister } from "./ipc/ipcRegister";
import { IpcRequestSignIn } from "./ipc/IpcRequestSignIn";
import isDev from "electron-is-dev";
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

function createWindow() {
  const window = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, "..", "preload.js"),
    },
    show: false,
  });

  if (isDev) {
    if (process.env["ELECTRON_RENDERER_URL"]) {
      window.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    }

    // open the devTools right away
    window.webContents.openDevTools({
      mode: "detach",
    });
  } else {
    window.loadFile(path.join(__dirname, "../renderer/index.html"));
  }

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

function installDebugExtensions() {
  // Install some debug extensions
  if (isDev) {
    installExtension([REACT_DEVELOPER_TOOLS])
      .then((extensions) => {
        console.log(`Added extensions: ${extensions}`);
      })
      .catch((err) => console.error(err));
  }
}

app.whenReady().then(async () => {
  installDebugExtensions();

  createWindow();
  loadIpc();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
