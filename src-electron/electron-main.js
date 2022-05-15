import { app, BrowserWindow, nativeTheme, dialog } from "electron";
import path from "path";
import os from "os";

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();
app.showExitPrompt = true;

try {
  if (platform === "win32" && nativeTheme.shouldUseDarkColors === true) {
    require("fs").unlinkSync(
      path.join(app.getPath("userData"), "DevTools Extensions")
    );
  }
} catch (_) {}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: /quasar-cli/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  // mainWindow.on("close", (e) => {
  //   if (app.showExitPrompt) {
  //     e.preventDefault(); // Prevents the window from closing
  //     let response = dialog.showMessageBox(
  //       {
  //         type: "question",
  //         buttons: ["Yes", "No"],
  //         title: "Confirmation de fermeture",
  //         message: "Etes vous sur de vouloir fermer la fenètre ?",
  //       },
  //       function (response) {
  //         if (response === 0) {
  //           // Runs the following if 'Yes' is clicked
  //           app.showExitPrompt = false;
  //           mainWindow.close();
  //         }
  //       }
  //     );
  //     if (response === 0) {
  //       // Runs the following if 'Yes' is clicked
  //       app.showExitPrompt = false;
  //       mainWindow.close();
  //     }
  //   }
  // });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
