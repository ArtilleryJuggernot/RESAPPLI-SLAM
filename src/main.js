const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow () {
  const win = new BrowserWindow({
    titleBarStyle: 'hidden',
    titleBarOverlay: {
        // color of titile bar
        color: '#3b3b3b',
        // color of titile bar control
        symbolColor: '#74b1be',
        // height of titile bar
        height: 32,},
    width: 1200,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      autoHideMenuBar: true,
      contextIsolation: false,
      icon : '/test/icon.ico',
  },
    
  })
  var splash = new BrowserWindow({
    width: 500, 
    height: 300, 
    transparent: true, 
    frame: false, 
    alwaysOnTop: true,
    icon: path.join(__dirname, 'icon.ico'),
});

  win.loadFile(path.join(__dirname, 'index.html'))
  win.center();

  splash.loadFile(path.join(__dirname,'loading.html'));
  splash.center();
  setTimeout(function () {
    splash.close();
    win.center();
    win.show();
  }, 3000);
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