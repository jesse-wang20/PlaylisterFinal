import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
    WelcomeScreen,
    WelcomeScreenBanner
} from './components'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/
const App = () => {   
    return (
        <BrowserRouter>
                <WelcomeScreenBanner />              
                    <Switch>
                        <Route path="/" exact component={WelcomeScreen} />
                    </Switch>
        </BrowserRouter>
    )
}

export default App