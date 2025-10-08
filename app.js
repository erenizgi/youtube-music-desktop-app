const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  Menu.setApplicationMenu(null);

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'YouTube Music',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  const userDataPath = path.join(app.getPath('userData'), 'music_youtube_data');
  app.setPath('userData', userDataPath);
  win.loadURL('https://music.youtube.com');
  win.on('closed', () => {
    try {
        win = null;
    } catch (error) {
        return
    }
    
  });


}

app.on('window-all-closed', () => {
  app.quit();
  setTimeout(() => {
    process.exit(0);
  }, 500);
});

app.whenReady().then(createWindow);