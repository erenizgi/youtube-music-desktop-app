const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  Menu.setApplicationMenu(null);
  app.setName("youtube-music");
  app.commandLine.appendSwitch('wm-class', 'youtube-music');
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'YouTube Music',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      webSecurity: false
    },
  });
  const userDataPath = path.join(app.getPath('userData'), 'music_youtube_data');
  app.setPath('userData', userDataPath);
  win.loadURL('https://music.youtube.com');
  const navigationMenu = Menu.buildFromTemplate([
    {
      label: 'Geri',
      click: () => {
        if (win.webContents.canGoBack()) {
          win.webContents.goBack();
        }
      },
    },
    {
      label: 'İleri',
      click: () => {
        if (win.webContents.canGoForward()) {
          win.webContents.goForward();
        }
      },
    },
  ],

  );
  Menu.setApplicationMenu(navigationMenu);

  win.webContents.setZoomFactor(1);

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