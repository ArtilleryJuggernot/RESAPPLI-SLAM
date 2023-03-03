const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow () {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      autoHideMenuBar: true,
      contextIsolation: false,
      icon : 'test/icon.ico',
  },
    width: 1200,
    height: 600,
  })

  win.loadFile(path.join(__dirname, 'index.html'))
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//export default fs  = require('fs');