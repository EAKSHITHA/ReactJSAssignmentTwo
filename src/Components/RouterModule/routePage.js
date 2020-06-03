import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from '../Home';
import Login from '../Account/login';
import PageNotFound from '../Common/PageNotFound';
import GlobalDataInitialize from '../Common/GlobalDataInitialize';


function routePage() {
    return (
        //<div>
            <Router>
                {/* <div> */}
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/Login" component={Login}/>
                        <Route path="/Home" component={Home}/>           
                        <Route component={PageNotFound} />
                    </Switch>
                {/* </div> */}
            </Router>
        //</div>
    )
}

export default routePage

