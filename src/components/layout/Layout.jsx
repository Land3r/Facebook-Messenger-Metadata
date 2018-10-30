import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Footer from './Footer'
import Navigation from './Navigation'
import Aside from './Aside'

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
            <div>
                <Header />
                <div id="main">
                    <div id="content">
                        {this.props.children}
                    </div>
                    <Navigation />
                    <Aside />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Layout