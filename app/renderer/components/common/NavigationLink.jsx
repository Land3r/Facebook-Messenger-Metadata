import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NavigationLink extends Component {
    static propTypes = {
        to: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

        onNavigateTo: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.onLinkClick = this.onLinkClick.bind(this)

        this.state = {}
    }

    onLinkClick() {
        this.props.onNavigateTo(this.props.to)
    }

    render() {
        return(
            <a href="#" onClick={this.onLinkClick}>
                {this.props.children}
            </a>
        )
    }
}

export default NavigationLink