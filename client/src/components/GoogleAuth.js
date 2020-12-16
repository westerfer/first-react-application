import React from 'react'
import {connect} from 'react-redux'
import {signIn, signOut} from "../actions";

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '326155135297-jr2kbc2innnreuhhilv3vsovpccog019.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        })
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    SignInClick = () => {
        this.auth.signIn()
    }

    SignOutClick = () => {
        this.auth.signOut()
    }
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={this.SignOutClick}>
                    <i className="google icon"></i>Sign Out
                </button>
            )
        } else {
            return (
                <button className="ui blue google button" onClick={this.SignInClick}>
                    <i className="google icon"></i>Sign In
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)
