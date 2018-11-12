import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Fabric } from 'office-ui-fabric-react';

import Header from '../../containers/layout/Header'
import NavigationBreadcrumb from '../../containers/layout/NavigationBreadcrumb'
import Footer from '../../containers/layout/Footer'
import Navigation from '../../containers/layout/Navigation'

class Layout extends Component {
    static propTypes = {
        children: PropTypes.any.isRequired
    }
    
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <Fabric>
                <Header />
                <div id="main">
                    <div id="content">
                    <NavigationBreadcrumb />
                        {this.props.children}
                    </div>
                    <Navigation />
                </div>
                <Footer />
            </Fabric>
        )
    }
}

export default Layout