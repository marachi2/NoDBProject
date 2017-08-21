import React , { Component } from 'react'
import { Switch , Route } from 'react-router-dom'
import App from './App.js'
import savedrecipes from './saved'


export default class Container extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route component={App} exact path= '/'/>
                    <Route component={savedrecipes} path= '/savedrecipes'/>
                </Switch>


            </div>
        )
    }
}


