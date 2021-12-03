import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import UserAddForm from "./components/user/UserAddForm";

type Props = {};
type State = {
    content: string;
}
class App extends React.Component<Props, State>{
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Switch>
                            <Route path="/" exact component={UserAddForm} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;

