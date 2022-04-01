const { app, BrowserWindow, ipcMain, Notification  } = require("electron");
const path = require("path");
let mainWindow; 
const loadMainWindow = () => {
    mainWindow = new BrowserWindow({
        width : 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));
}

app.on("ready", loadMainWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});

ipcMain.on('show-notification', (event, ...args) => {
    const notification = {
        title: 'New Task',
        body: `Added: ${args[0]}`
    }

    new Notification(notification).show()
});

ipcMain.on("download", (event, {payload}) => {
    mainWindow.webContents.downloadURL(payload.fileURL)
});