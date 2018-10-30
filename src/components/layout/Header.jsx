import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Header extends Component {
    static PropTypes = {

    }

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <header>
                <h1>Header</h1>
            </header>
        )
    }
}

export default Header