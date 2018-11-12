import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Label } from 'office-ui-fabric-react'
import {capitalizeFirstLetter} from '../../utils/strings'


class NavigationBreadcrumb extends Component {
    static propTypes = {
    }

    constructor(props) {
        super(props)

        this.onBreadcrumbItemClicked = this.onBreadcrumbItemClicked.bind(this)
        this.onRouteChanged = this.onRouteChanged.bind(this)

        let pathname = props?.location?.pathname ?? null
        let breadcrumbItems = []
        if (pathname !== null) {
            breadcrumbItems = this.getBreadcrumbItems(pathname)
        }
        this.state = {
            items: breadcrumbItems
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          this.onRouteChanged();
        }
    }

    onBreadcrumbItemClicked(event, item) {
        this.props.history.push({pathname: item.key})
        console.log(`Breadcrumb item with key "${item.key}" has been clicked.`);
    }

    onRouteChanged() {
        let pathname = this.props?.location?.pathname ?? null
        if (pathname !== null) {
            let breadcrumbItems = this.getBreadcrumbItems(pathname)
            this.setState({items: breadcrumbItems})
        }
    }

    getBreadcrumbItems(pathname) {
        let breadcrumbItems = []
        if (pathname !== null) {
            let pathParts = pathname.split('/').filter((element) => element !== '')
            if (pathParts.length > 0) {
                let currentItemUrl = ''
                pathParts.forEach((element) => {
                    currentItemUrl = currentItemUrl + '/' + element
                    let item = {
                        text: capitalizeFirstLetter(element),
                        key: capitalizeFirstLetter(currentItemUrl)
                    }
                    breadcrumbItems.push(item)
                })
            }
            else {
                let item = { text: 'Home', key: '/' }
                breadcrumbItems.push(item)
            }
        }
        return breadcrumbItems
    }

    render() {

        const items = this.state.items.map((element) => {
            element.onClick = this.onBreadcrumbItemClicked
            return element
        })

        return (
        <Breadcrumb
          items={items}
          ariaLabel={'Breadcrumb'}
          overflowAriaLabel={'More links'}
        />
        )
    }
}

export default NavigationBreadcrumb