const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// require('../src/message-control/main');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const { sqlite3 } = require('sqlite3')
const Promise = require('bluebird');

let mainWindow;
try {
  require("../src/message-control/main")
} catch (err) {
  console.log(err, "Could not load main from message control")
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    icon: __dirname + '/icon.png',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    isDev ?
      'http://localhost:3000' :
      `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
  const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

  installExtension(REACT_DEVELOPER_TOOLS).then((name) => {
    console.log(`Added Extension:  ${name}`);
  })
    .catch((err) => {
      console.log('An error occurred: ', err);
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
