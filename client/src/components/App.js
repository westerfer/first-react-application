import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import history from "../history";
import Header from "./header";


// 326155135297-jr2kbc2innnreuhhilv3vsovpccog019.apps.googleusercontent.com
const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path="/" exact component={StreamList}/>
                    <Route path="/streams/new" exact component={StreamCreate}/>
                    <Route path="/streams/edit/:idd" exact component={StreamEdit}/>
                    <Route path="/streams/delete/:idd" exact component={StreamDelete}/>
                    <Route path="/streams/:idd" exact component={StreamShow}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App
