import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import GoogleAuth from "../GoogleAuth";

class Header extends React.Component {

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <Link to="/streams/new" className="item">
                    Create Stream
                </Link>
            )
        }
    }

    renderNavigation() {
        return (
            <>
                <Link to="/" className="item">
                    Streamer
                </Link>

                <div className="right menu">
                    <Link to="/" className="item">
                        All Streams
                    </Link>
                    {this.renderCreate()}
                    <GoogleAuth />
                </div>
            </>
        )
    }

    render() {
        return (
            <div className="ui secondary pointing menu">
                {this.renderNavigation()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps)(Header)
