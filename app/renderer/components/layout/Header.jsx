import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from '../../assets/images/logo/messenger_logo.svg'

class Header extends Component {
    static propTypes = {
    }

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <header>
                <img src={logo} alt='Logo' className="logo" />
                <h1>Facebook Messenger Metadata analyzer</h1>
            </header>
        )
    }
}

export default Header