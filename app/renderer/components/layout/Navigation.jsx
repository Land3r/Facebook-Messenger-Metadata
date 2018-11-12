import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavigationLink from '../../containers/common/NavigationLink';

class Navigation extends Component {
    static propTypes = {
        messagesNavLinks: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <nav>
                <h3>Navigation</h3>
                <ul>
                    <li>
                        <NavigationLink to='/import'>Import</NavigationLink>
                    </li>
                    <li>
                        <NavigationLink to='/Overview'>Overview</NavigationLink>
                    </li>
                </ul>
                <h3>Conversations disponibles</h3>
                <ul>
                    {this.props.messagesNavLinks.map((messageNavLink, key) => (
                        <li key={key}>
                            <NavigationLink to={messageNavLink.url} key={key}>{messageNavLink.title}</NavigationLink>
                        </li>  
                    ))}
                </ul>
            </nav>
        )
    }
}

export default Navigation