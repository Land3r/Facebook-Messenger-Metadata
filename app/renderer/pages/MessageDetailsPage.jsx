import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CircularJSON from 'circular-json'
import { moment } from '../utils/dates'
import {PrimaryButton, DefaultButton, TextField, Toggle, DetailsList, DetailsListLayoutMode, Selection, SelectionMode, MarqueeSelection, Panel, PanelType} from 'office-ui-fabric-react'


class MessageDetailsPage extends Component {
    static propTypes = {
        message: PropTypes.object.isRequired
    }
    
    constructor(props) {
        super(props)

        this.getFirstMessage = this.getFirstMessage.bind(this)
        this.getLastMessage = this.getLastMessage.bind(this)
        this.getMessageStatistics = this.getMessageStatistics.bind(this)
        this.onRouteChanged = this.onRouteChanged.bind(this)
        this.onMessagesTableSelectionUpdate = this.onMessagesTableSelectionUpdate.bind(this)
        this.onMessagesTableFilterUpdate = this.onMessagesTableFilterUpdate.bind(this)
        this.onMessagesTableColumnHeaderClick = this.onMessagesTableColumnHeaderClick.bind(this)
        this.toggleSidePanel = this.toggleSidePanel.bind(this)
        this.openSidePanel = this.openSidePanel.bind(this)
        this.closeSidePanel = this.closeSidePanel.bind(this)
        this.onSidePanelRenderFooterContent = this.onSidePanelRenderFooterContent.bind(this)

        this.state = {
            message: this.props.message,
            selection: new Selection({onSelectionChanged: () => {this.onMessagesTableSelectionUpdate()}}),
            selectedMessages: [],
            columnsDefinition: [
                {
                    key: 'column1',
                    name: 'Expéditeur',
                    fieldName: 'sender_name',
                    ariaLabel: 'Column operations for Expediteur',
                    isRowHeader: true,
                    isResizable: true,
                    isSorted: true,
                    isSortedDescending: false,
                    minWidth: 100,
                    maxWidth: 250,
                    onColumnClick: this._onColumnClick
                  },
                  {
                    key: 'column2',
                    name: 'Message',
                    fieldName: 'content',
                    minWidth: 200,
                    maxWidth: 1000,
                    isRowHeader: true,
                    isResizable: true,
                    isSorted: true,
                    isSortedDescending: false,
                    sortAscendingAriaLabel: 'Sorted A to Z',
                    sortDescendingAriaLabel: 'Sorted Z to A',
                    data: 'string',
                    isPadded: true
                  },
                  {
                    key: 'column3',
                    name: 'Envoyé le',
                    fieldName: 'timestamp_ms',
                    minWidth: 70,
                    maxWidth: 90,
                    isResizable: true,
                    data: 'number',
                    onRender: (item) => {
                      return <span>{moment(item.timestamp_ms).format('LLL')}</span>;
                    },
                    isPadded: true
                  },
                  {
                    key: 'column4',
                    name: 'Score',
                    fieldName: 'score',
                    minWidth: 70,
                    maxWidth: 90,
                    isResizable: true,
                    isCollapsable: true,
                    data: 'number',
                    isPadded: true
                  },
                  {
                    key: 'column5',
                    name: 'Confiance',
                    fieldName: 'comparative',
                    minWidth: 70,
                    maxWidth: 90,
                    isResizable: true,
                    isCollapsable: true,
                    data: 'number',
                    onColumnClick: this._onColumnClick,
                  }
            ],
            isPanelOpen : false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          this.onRouteChanged();
        }
    }

    onRouteChanged() {
        const thread_path = this.props?.match?.params?.thread_path ?? null
        if (thread_path !== null) {
            this.setState({message: this.props.message})
        }
    }

    getFirstMessage() {
        if (this.props.message != null && this.props.message.messages != null && this.props.message.messages.length > 1) {
            const firstMessage = this.props.message.messages.sort((a, b) => a.timestamp_ms > b.timestamp_ms)[0]
            if (firstMessage != null) {
                return moment(firstMessage.timestamp_ms).format('LLL') + ' (' + moment(firstMessage.timestamp_ms).fromNow() + ')'
            }
            else {
                return ''
            }
        }

        else {
            return ''
        }
    }

    getLastMessage() {
        if (this.props.message != null && this.props.message.messages != null && this.props.message.messages.length > 1) {
            const lastMessage = this.props.message.messages.sort((a, b) => a.timestamp_ms > b.timestamp_ms)[this.props.message.messages.length - 1]
            if (lastMessage != null) {
                return moment(lastMessage.timestamp_ms).format('LLL') + ' (' + moment(lastMessage.timestamp_ms).fromNow() + ')'
            }
            else {
                return ''
            }
        }
        else {
            return ''
        }
    }

    getMessageStatistics() {
        if (this.props.message.messages != null) {
            return this.props.message.messages.length + ' messages au total.'
        }
    }

    onMessagesTableSelectionUpdate() {
        // Open the side panel if it is not opened yet.
        if (this.state.isPanelOpen !== true) {
            this.openSidePanel()
        }

        // Update the selected messages.
        this.setState({selectedMessages: this.state.selection.getSelection()})

        console.log(this.state.selection.getSelection())
    }

    onMessagesTableFilterUpdate(event, text) {
        this.setState({ message: text ? this.props.message.messages.filter(i => i.content.toLowerCase().indexOf(text) > -1) : this.props.message.messages });
    }

    onMessagesTableColumnHeaderClick(event, text) {
        console.log('We should change the order of items.')
    }

    toggleSidePanel() {
        this.setState({isPanelOpen: !this.state.isPanelOpen})
    }

    closeSidePanel() {
        this.setState({isPanelOpen: false})
    }

    openSidePanel() {
        this.setState({isPanelOpen: true})
    }

    onSidePanelRenderFooterContent() {
        return (
            <div>
                <DefaultButton onClick={this.closeSidePanel}>Fermer</DefaultButton>
            </div>
        )
    }

    render() {

        const renderSidePanelContent = () => {
            if (this.state.selectedMessages != null && this.state.selectedMessages.length != 0) {
                const selectedItem = this.state.selectedMessages[0]


                return (
                    <React.Fragment>
                        <ul>
                            <li>Expediteur: {selectedItem.sender_name}</li>
                            <li>Date: {moment(selectedItem.timestamp_ms).format('LLL') + ' (' + moment(selectedItem.timestamp_ms).fromNow() + ')'}</li>
                            <li>Contenu: {selectedItem.content}</li>
                            <li>Type: {selectedItem.type}</li>
                        </ul>
                        <br />
                        <h5>Analyse</h5>
                        Mots pondérés
                        <table>
                            <thead>
                                <tr>
                                    <th>Mot</th>
                                    <th>Impact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedItem.words.map((word, key) => (<tr key={key}>
                                    <td>{word}</td>
                                    <td>{typeof(selectedItem.positive.find((currentWord) => (currentWord == word))) !== 'undefined' ? '<b style="color: red;">+</b>': '<b style="color: green;">-</b>'}</td>
                                </tr>))}
                            </tbody>
                        </table>
                    </React.Fragment>
                )
            }
            else {
                return 'No Item'
            }
        }

        return (
            <div>
                <h4>Détails de {this.props.message.thread_path}</h4>
                <hr />
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-u-sm6 block">
                            Premier échange le {this.getFirstMessage()}<br />
                            Dernier échange le {this.getLastMessage()}<br />
                        </div>
                        <div className="ms-Grid-col ms-u-sm6 block">
                            {this.getMessageStatistics()}
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <TextField label="Filter" onChange={this.onMessagesTableFilterUpdate} />
                        <MarqueeSelection selection={this.state.selection}>
                            <DetailsList
                                items={this.state.message.messages}
                                compact={false}
                                columns={this.state.columnsDefinition}
                                selectionMode={SelectionMode.multiple}
                                setKey="set"
                                layoutMode={DetailsListLayoutMode.justified}
                                isHeaderVisible={true}
                                selection={this.state.selection}
                                selectionPreservedOnEmptyClick={true}
                                onItemInvoked={this._onItemInvoked}
                                onColumnHeaderClick={this.onMessagesTableColumnHeaderClick}
                                enterModalSelectionOnTouch={true}
                                ariaLabelForSelectionColumn="Toggle selection"
                                ariaLabelForSelectAllCheckbox="Sélectionner tous les messages"
                            />
                        </MarqueeSelection>
                    </div>
                    <Panel
                        isOpen={this.state.isPanelOpen}
                        type={PanelType.smallFixedFar}
                        isLightDismiss={true}
                        onDismiss={(event) => {
                            if (event == null) {
                                // Close button was called.
                            }

                            // Because of the 'light dismiss' behavior, the state of the panel is not reset to false of light dismiss.
                            else if (event.nativeEvent.srcElement && event.nativeEvent.srcElement.className.indexOf('ms-Button-icon') !== -1) {
                                // Close arrow was clicked.
                            }
                            else if (event.nativeEvent.srcElement && event.nativeEvent.srcElement.className.indexOf('ms-Overlay') !== -1) {
                                // Light dismiss was used.
                                this.setState({isPanelOpen: !this.state.isPanelOpen})
                            }
                        }}
                        isFooterAtBottom={true}
                        headerText='My awesome message to change'
                        closeButtonAriaLabel="Fermer"
                        onRenderFooterContent={this.onSidePanelRenderFooterContent}
                    >
                    {renderSidePanelContent()}
                    </Panel>
                </div>
            </div>
        )
    }
}

export default MessageDetailsPage