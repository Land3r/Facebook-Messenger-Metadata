import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { moment } from '../utils/dates'
import {PrimaryButton, TextField, Toggle, DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn, MarqueeSelection} from 'office-ui-fabric-react'

class MessageDetailsPage extends Component {
    static propTypes = {
        message: PropTypes.object.isRequired
    }
    
    constructor(props) {
        super(props)

        this.getFirstMessage = this.getFirstMessage.bind(this)
        this.getLastMessage = this.getLastMessage.bind(this)
        this.getMessageStatistics = this.getMessageStatistics.bind(this)
        this.onFilterUpdate = this.onFilterUpdate.bind(this)
        this.onRouteChanged = this.onRouteChanged.bind(this)

        this.state = {
            message: this.props.message,
            selection: new Selection({onSelectionChanged: () => {console.log('Selection Changed')}}),
            columnsDefinition: [
                {
                    key: 'column1',
                    name: 'Expediteur',
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
            ]
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          this.onRouteChanged();
        }
    }

    onRouteChanged() {
        let thread_path = this.props?.match?.params?.thread_path ?? null
        if (thread_path !== null) {
            this.setState({message: this.props.message})
        }
    }

    getFirstMessage() {
        if (this.props.message != null && this.props.message.messages != null && this.props.message.messages.length > 1) {
            let firstMessage = this.props.message.messages.sort((a, b) => a.timestamp_ms > b.timestamp_ms)[0]
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
            let lastMessage = this.props.message.messages.sort((a, b) => a.timestamp_ms > b.timestamp_ms)[this.props.message.messages.length - 1]
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

    onFilterUpdate(event, text) {
        this.setState({ message: text ? this.props.message.messages.filter(i => i.content.toLowerCase().indexOf(text) > -1) : this.props.message.messages });
    }

    render() {
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
                        <TextField label="Filter" onChange={this.onFilterUpdate} />
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
                                enterModalSelectionOnTouch={true}
                                ariaLabelForSelectionColumn="Toggle selection"
                                ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                            />
                        </MarqueeSelection>
                    </div>
                </div>
            </div>
        )
    }
}

export default MessageDetailsPage