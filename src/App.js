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

import UserState from './context/UserState'

import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';

import Billing from './components/Dashboard/Billing';
import Checkout from './components/Checkout';

function App() {
  return (
    <>

      <UserState>
        <Router>

          <Header />

          <Switch>

            {/* RUTAS PRIVADAS */}
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/dashboard/billing" component={Billing} />
            <PrivateRoute exact path="/checkout" component={Checkout} />

            {/* RUTAS DE AUTENTICACIÓN */}
            <AuthRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/checkout" component={Checkout} />

            {/* RUTAS PÚBLICAS */}
            
            <Route path="/" component={Home} />
          </Switch>

        </Router>
      </UserState>

    </>
  );
}

export default App;
