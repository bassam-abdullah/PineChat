import React from "react";
import Join from "./components/Join/Join"
import Chat from "./components/Chat/Chat"

import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <Route exact path="/" component={Join}/>
            <Route path="/chat" component={Chat}/>
        </Router>
    )
}

export default App