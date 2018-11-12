import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogFooter, DialogType, DefaultButton, PrimaryButton, Modal, TextField } from 'office-ui-fabric-react';
const { ipcRenderer } = require('electron')
import messages from '../../main/electron-messages'

import ElectronUtils from '../utils/electron'
import {moment} from '../utils/dates'

class ImportPage extends Component {
    static propTypes = {
        addMessages: PropTypes.func.isRequired,
        addFolders: PropTypes.func.isRequired,
        updateFolders: PropTypes.func.isRequired
    }
    
    constructor(props) {
        super(props)

        this.toggleModal = this.toggleModal.bind(this)
        this.selectFolder = this.selectFolder.bind(this)
        this.importFolder = this.importFolder.bind(this)
        this.parseFolder = this.parseFolder.bind(this)
        this.startProgressBar = this.startProgressBar.bind(this)
        this.updateProgressBar = this.updateProgressBar.bind(this)
        this.closeProgressBar = this.closeProgressBar.bind(this)

        this.state = {
            importModalProps: {
                isBlocking: true,
                containerClassName: ''
            },
            isModalOpen: false,
            selectedFolder: ''
        }
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    selectFolder() {
        let electronUtils = new ElectronUtils()
        let directory = electronUtils.openDirectory()
        this.setState({selectedFolder: directory})
    }

    importFolder() {
        this.props.addFolders({
            name: this.state.selectedFolder,
            created: moment().format('LLL'),
            status: 'importing',
            elements: 0,
            path: this.state.selectedFolder
        })
        let electronUtils = new ElectronUtils()
        let result = electronUtils.getDirectories(this.state.selectedFolder)

        this.startProgressBar(result.length)
        result.map((folder, key) => {
            this.updateProgressBar(key, folder)
            this.parseFolder(folder, key)
        })
        this.props.updateFolders({
            name: this.state.selectedFolder,
            created: moment().format('LLL'),
            status: 'imported',
            elements: result.length,
            path: this.state.selectedFolder
        })
        this.closeProgressBar()
        this.toggleModal()
    }

    startProgressBar(numberOfItems) {
        ipcRenderer.send(messages["progressbar-start"], {maxValue: numberOfItems})
    }

    updateProgressBar(value, folderName) {
        ipcRenderer.send(messages["progressbar-update"], {value: value, folderName: folderName})
    }

    closeProgressBar() {
        ipcRenderer.send(messages["progressbar-close"])
    }

    parseFolder(folder, key) {
        let electronUtils = new ElectronUtils()
        let result = null
        try {
            result = electronUtils.parseDirectory(folder)
            this.props.addMessages(result)
        } catch (error) {
            console.error(`Error occured while parsing: ${error} on ${folder}`)
        }
    }

    render() {
        return (
            <div>
                <p>
                    Yous should first export your data from Facebook in JSON format and includes 'Messages'.
                    Facebook will generate an archive that you should download and extract.
                </p>
                <p>
                    Once this is done, click on <PrimaryButton onClick={this.toggleModal}>Import facebook folder</PrimaryButton>
                </p>
                <Dialog hidden={!this.state.isModalOpen} onDismiss={this.toggleModal} modalProps={this.state.modalProps}>
                    <div className="">
                        <span>Import a directory</span>
                    </div>
                    <div className="">
                        <br />
                        <PrimaryButton onClick={this.selectFolder} text="Select folder" />
                        <br />
                        <TextField label="Selected folder" disabled={true} value={this.state.selectedFolder} />
                        <br />
                    </div>
                    <DialogFooter>
                        <PrimaryButton onClick={this.importFolder} text="Import folder" />
                        <DefaultButton onClick={this.toggleModal} text="Cancel" />
                    </DialogFooter>
                </Dialog>
            </div>
        )
    }
}

export default ImportPage