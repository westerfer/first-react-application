import React from 'react'
import flv from 'flv.js'
import {connect} from 'react-redux'
// import {Link} from "react-router-dom";
// import Modal from "../Modal";
// import history from "../../history";


import {fetchStream} from "../../actions";

class StreamShow extends React.Component {

    constructor(props) {
        super(props);

        this.videoRef = React.createRef()
    }

    componentDidMount() { // Only runs once on page load
        const {id} = this.props.match.params
        this.props.fetchStream(id)
        this.buildPlayer()
    }

    componentDidUpdate() { // will run again after componentDidMount. if build player doesn't load on the didMount it will load here
        this.buildPlayer()
    }

    componentWillUnmount() { // runs when navigated away from page.
        this.player.destroy()
        console.log('I was Unmounted')
    }

    buildPlayer() {
        const {id} = this.props.match.params

        if (this.player || !this.props.stream) {
            return;
        }

        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if (!this.props.stream) {
            return (
                <div>Loading</div>
            )
        }

        const {title, description} = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} style={{width: '100%',}} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps, {fetchStream})(StreamShow)
