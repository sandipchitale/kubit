import { app, BrowserWindow, globalShortcut, Tray, Menu } from 'electron';
import * as path from 'path';

global['ShowKubitShortcut'] = (process.platform === 'darwin' ? 'Command+Alt+Shift+K' : 'Control+Alt+Shift+K');

declare var __dirname: string;

let mainWindow: Electron.BrowserWindow;

function toggleKubit() {
  if (mainWindow) {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  } else {
    mainWindow = new BrowserWindow({
      width: 1100,
      height: 800,
      maximizable: false,
      frame: false,
      icon: path.join(__dirname, 'assets', 'kubit.png'),
      resizable: true,
      center: true
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    // mainWindow.webContents.openDevTools({mode: 'detach'}); 
    mainWindow.on('close', () => {
      app.quit();
    })

  }
}

let tray: Tray;

function onReady() {
  tray = new Tray(path.join(__dirname, 'assets', 'kubit.png'));
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Exit', type: 'normal', click: () => { app.quit(); }}
  ]);
  tray.setToolTip('Click to show/hide Kubit ( ' + global['ShowKubitShortcut'] + ' ). Use Exit in context menu to quit.');
  tray.setContextMenu(contextMenu);
  tray.on('click', toggleKubit);

  globalShortcut.register(global['ShowKubitShortcut'], () => {
    toggleKubit();
  });

  toggleKubit();
}

app.on('ready', () => onReady());

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister(global['ShowKubitShortcut']);

  // Unregister all shortcuts.
  globalShortcut.unregisterAll();

  if (tray && !tray.isDestroyed()) {
    tray.destroy();
  }
});
