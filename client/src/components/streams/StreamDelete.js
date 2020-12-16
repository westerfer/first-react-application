import React from 'react'

import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import Modal from "../Modal";
import history from "../../history";

import {fetchStream, deleteStream} from "../../actions";


class StreamDelete extends React.Component {
    componentDidMount() {
        const {id} = this.props.match.params
        this.props.fetchStream(id)
    }

    renderActions() {
        const {id} = this.props.match.params
        return (
            <>
                <Link to="/" className="ui button primary">Cancel</Link>
                <button className="ui button negative" onClick={() => this.props.deleteStream(id)} >Delete</button>
            </>
        )
    }

    renderContent() {
        if(!this.props.stream) {
            return 'Are you sure you want to delete this stream?'
        }
        return `Are you sure you want to delete this stream with title: ${this.props.stream.title}?`

    }

    render() {

        return (
            <Modal
                title="Delete Stream"
                onDismiss={() => history.push('/')}
                content={this.renderContent()}
                actions={this.renderActions()}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
    }
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete)
