const electron = require('electron');
const path = require('path');
const fs = require('fs');

// Module to control application life.
const app = electron.app;
const protocol = electron.protocol;
const session = electron.session;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const args = process.argv.slice(1);
const isDev = args.some(val => val === '--dev');

protocol.registerStandardSchemes(['app']);

function createWindow () {
  protocol.registerFileProtocol('app', function(request, callback) {});

  const httpfilter = {
    urls: ['http://*']
  };

  session.defaultSession.webRequest.onBeforeSendHeaders(httpfilter, function(details, callback) {
    const dir = app.getPath('userData');
    const domain = fs.existsSync(dir + '/domain') ? fs.readFileSync(dir + '/domain', 'utf8') : '';

    details.requestHeaders['Origin'] = domain;
    callback({ cancel: false, requestHeaders: details.requestHeaders })
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();

    const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');

    installExtension(REDUX_DEVTOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  require('./menu');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
