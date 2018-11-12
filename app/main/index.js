import path from 'path'
import { app, crashReporter, BrowserWindow, Menu, ipcMain } from 'electron'
import ProgressBar from 'electron-progressbar'
import messages from './electron-messages' 

const isDevelopment = process.env.NODE_ENV === 'development'

let mainWindow = null
let forceQuit = false
let progressBar = null;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  for (const name of extensions) {
    try {
      await installer.default(installer[name], forceDownload)
    } catch (e) {
      console.log(`Error installing ${name} extension: ${e.message}`)
    }
  }
}

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: false,
});

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('ready', async () => {
  if (isDevelopment) {
    await installExtensions()
  }

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    show: false,
  });

  mainWindow.loadFile(path.resolve(path.join(__dirname, '../renderer/index.html')))

  // show window once on first load
  mainWindow.webContents.once('did-finish-load', () => {
    mainWindow.show()
  });

  mainWindow.webContents.on('did-finish-load', () => {
    // Handle window logic properly on macOS:
    // 1. App should not terminate if window has been closed
    // 2. Click on icon in dock should re-open the window
    // 3. ⌘+Q should close the window and quit the app
    if (process.platform === 'darwin') {
      mainWindow.on('close', function(e) {
        if (!forceQuit) {
          e.preventDefault()
          mainWindow.hide()
        }
      })

      app.on('activate', () => {
        mainWindow.show()
      })

      app.on('before-quit', () => {
        forceQuit = true
      })
    } else {
      mainWindow.on('closed', () => {
        mainWindow = null
      })
    }
    
  })

  if (isDevelopment) {
    // auto-open dev tools
    mainWindow.webContents.openDevTools()

    // add inspect element on right click menu
    mainWindow.webContents.on('context-menu', (e, props) => {
      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click() {
            mainWindow.inspectElement(props.x, props.y)
          },
        },
      ]).popup(mainWindow)
    })
  }

  // Messages between IpcMain and IpcRendered
  ipcMain.on(messages["progressbar-start"], (event, args) => {
    console.log('startProgressBar on main (message received)')
    progressBar = new ProgressBar({
      indeterminate: false,
      BrowserWindow: {
        resizable: false,
        closable: true
      },
      maxValue: args.maxValue,
      title: 'Importing local data',
      text: 'Importing data',
      detail: `Importing folder 0 out of ${args.maxValue}`
    })

    progressBar.on('completed', function() {
        progressBar.detail = 'Task completed. Exiting...'
      })
      .on('aborted', function(value) {
        console.info(`aborted... ${value}`)
      })
      .on('progress', function(value) { // eslint-disable-line no-unused-vars
      })
      event.sender.send(messages["progressbar-start"], true)
  })
  ipcMain.on(messages["progressbar-update"], (event, args) => { // eslint-disable-line no-unused-vars
    progressBar.value = args.value
    progressBar.detail = `Importing folder ${args.folderName} (${args.value}/${progressBar.getOptions().maxValue}) ...`
  })
  ipcMain.on(messages["progressbar-close"], (event, args) => { // eslint-disable-line no-unused-vars
    progressBar.close()
  })
  ipcMain.on(messages["progressbar-abord"], (event, args) => { // eslint-disable-line no-unused-vars
    progressBar.close()
  })
})