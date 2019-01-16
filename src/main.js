const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron');
const url = require('url');
const path = require('path');
const mainMenuTemplate = require('./js/mainMenuTemplate');

//Declare window variables
let mainWindow,
    aboutWindow,
    settingsWindow,
    customCSSWindow,
    themeCustomizerWindow;

//Use singleInstanceLock for making app single instance
const singleInstanceLock = app.requestSingleInstanceLock();

if (!singleInstanceLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.focus();
        }
    });

    app.on('ready', () => {
        mainWindow = new BrowserWindow({
            title: `Altus ${app.getVersion()}`,
            frame: false,
            titleBarStyle: 'hidden',
            backgroundColor: '#282C34',
            icon: './build/icon.ico'
        });
        mainWindow.maximize(); //Maximizing the main window always
        mainWindow.loadURL(url.format({ //Loads the mainwindow html file
            pathname: path.join(__dirname, 'windows', 'main', 'window.html'),
            protocol: 'file:',
            slashes: true
        }));

        //Setting main menu
        const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
        Menu.setApplicationMenu(mainMenu);
    });
}

//Quit app if all windows are closed
app.on('window-all-closed', () => {
    app.quit()
});