import logo from './logo.svg';
import './App.css';

import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

import Header from './components/Layout/Header'

function App() {
  return (
    <>

      <Router>

        <Header />

        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/" component={Home}/>
        </Switch>
      </Router>


    </>
  );
}

export default App;
