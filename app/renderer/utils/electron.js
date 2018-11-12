const { dialog } = require('electron').remote;
const { lstatSync, readdirSync, existsSync, readFileSync } = require('fs')
const { join } = require('path')
const sentiment = require('multilang-sentiment');
const format = require('./format/en.json')

class ElectronUtils {
  constructor() {
    this.messageFileName = format.filename
    this.contentJsonTag = format.messages__content

    this.openDirectory = this.openDirectory.bind(this)
    this.isDirectory = this.isDirectory.bind(this)
    this.getDirectories = this.getDirectories.bind(this)
    this.parseDirectory = this.parseDirectory.bind(this)

  }

  /**
   * Shows the 'Open Directory' dialog from electron.
   */
  openDirectory() {
    const result = dialog.showOpenDialog({properties: ["openDirectory"]})
    if (result != null && result.length == 1) {
        return result[0]
    }
  }

  /**
   * Gets whether or not the source is a directory.
   * @param {*} folder The source file (or folder) to check
   */
  isDirectory(folder) {
    return lstatSync(folder).isDirectory()
  }

  /**
   * Gets all the sub directories of a directory
   * @param {*} folder The source folder to explore
   */
  getDirectories(folder) {
    return readdirSync(folder).map(name => join(folder, name)).filter(this.isDirectory)
  }

  /**
   * Parses the folder to extract metadata from it.
   * @param {*} folder The folder where to look for messages. 
   */
  parseDirectory(folder) {
    const filePath = join(folder, this.messageFileName)
    if (existsSync(filePath)) {
      let fileContent = readFileSync(filePath, 'utf8')
      fileContent = fileContent.toString().replace(/\r?\n|\r/g, '')
      const conversationMetadata = JSON.parse(fileContent, (key, value) => {
        // Special case to stringify the JSON content.
        if (key == this.contentJsonTag) {
          return JSON.stringify(value)
        }
        else {
          return value
        }
      })
      if (conversationMetadata != null && conversationMetadata.messages != null && typeof(conversationMetadata.messages) === 'object' && conversationMetadata.messages.length >= 1) {
        const messagesResult = conversationMetadata.messages.map((message) => {
          const metadata = sentiment(message.content, 'fr')
          return { ...message, ...metadata}
        })
        const result = {...conversationMetadata, messages: [...messagesResult]}
        return result
      }
      else {
        console.log(`No messages found for ${folder}`)
      }
    }
    else {
      console.log(`File ${filePath} doesn't exists`)
    }
  }
}

export default ElectronUtils