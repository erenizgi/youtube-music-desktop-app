const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let win;

const userDataPath = path.join(app.getPath('userData'), 'music_youtube_data');

if (!fs.existsSync(userDataPath)) {
  fs.mkdirSync(userDataPath, { recursive: true });
}
app.setPath('userData', userDataPath);

// app.disableHardwareAcceleration();

function createWindow() {
  app.setName('youtube-music-desktop-app');
  app.commandLine.appendSwitch('wm-class', 'youtube-music-desktop-app');

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'YouTube Music',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
    },
  });

  win.loadURL('https://music.youtube.com');

  win.webContents.setZoomFactor(1);


  const navigationMenu = Menu.buildFromTemplate([
    {
      label: '← Geri',
      click: () => {
        if (win.webContents.canGoBack()) win.webContents.goBack();
      },
    },
    {
      label: 'İleri →',
      click: () => {
        if (win.webContents.canGoForward()) win.webContents.goForward();
      },
    },

  ]);
  Menu.setApplicationMenu(navigationMenu);

  win.on('closed', () => {
    win = null;
  });
}

app.on('window-all-closed', () => {
  app.quit();
});

app.whenReady().then(createWindow);
