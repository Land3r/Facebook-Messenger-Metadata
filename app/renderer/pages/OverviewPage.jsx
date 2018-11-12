import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {PrimaryButton, TextField, Toggle, DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn, MarqueeSelection} from 'office-ui-fabric-react'

class OverviewPage extends Component {
    static propTypes = {
        folders: PropTypes.array.isRequired,
        resetMessages: PropTypes.func.isRequired,
        resetFolders: PropTypes.func.isRequired
    }
    
    constructor(props) {
        super(props)

        this.forgetExistingData = this.forgetExistingData.bind(this)
        this.onFilterUpdate = this.onFilterUpdate.bind(this)

        this.state = {
            folders: [...this.props.folders],
            selection: new Selection({onSelectionChanged: () => {console.log('Selection Changed')}}),
            columnsDefinition: [
                {
                  key: 'column1',
                  name: 'Folder',
                  headerClassName: 'DetailsListExample-header--FileIcon',
                  className: 'DetailsListExample-cell--FileIcon',
                  iconClassName: 'DetailsListExample-Header-FileTypeIcon',
                  ariaLabel: 'Column operations for File type',
                  iconName: 'Page',
                  isIconOnly: true,
                  fieldName: 'name',
                  minWidth: 16,
                  maxWidth: 16,
                  onColumnClick: this._onColumnClick,
                  onRender: (item) => {
                    return <img src={item.iconName} className={'DetailsListExample-documentIconImage'} />;
                  }
                },
                {
                  key: 'column2',
                  name: 'Folder name',
                  fieldName: 'name',
                  minWidth: 210,
                  maxWidth: 350,
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
                  name: 'Created',
                  fieldName: 'created',
                  minWidth: 70,
                  maxWidth: 90,
                  isResizable: true,
                  data: 'number',
                  onRender: (item) => {
                    return <span>{item.created}</span>;
                  },
                  isPadded: true
                },
                {
                  key: 'column4',
                  name: 'Status',
                  fieldName: 'status',
                  minWidth: 70,
                  maxWidth: 90,
                  isResizable: true,
                  isCollapsable: true,
                  data: 'string',
                  onRender: (item) => {
                    return <span>{item.status}</span>;
                  },
                  isPadded: true
                },
                {
                  key: 'column5',
                  name: 'Conversations',
                  fieldName: 'elements',
                  minWidth: 70,
                  maxWidth: 90,
                  isResizable: true,
                  isCollapsable: true,
                  data: 'number',
                  onColumnClick: this._onColumnClick,
                  onRender: (item) => {
                    return <span>{item.elements}</span>;
                  }
                }
              ]
        }
    }

    forgetExistingData() {
        this.props.resetMessages()
        this.props.resetFolders()
    }

    onFilterUpdate(event, text) {
        this.setState({ folders: text ? this.props.folders.filter(i => i.name.toLowerCase().indexOf(text) > -1) : this.props.folders });
    }

    render() {
        return (
            <div>
                <h4>Overview</h4>
                <div>
                    {this.props.folders?.length} folders parsed.
                </div>
                <div>
                    <TextField label="Filter" onChange={this.onFilterUpdate} />
                    <MarqueeSelection selection={this.state.selection}>
                    <DetailsList
                        items={this.state.folders}
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
                <PrimaryButton onClick={this.forgetExistingData}>Forget existing data</PrimaryButton>
            </div>
        )
    }
}

export default OverviewPage