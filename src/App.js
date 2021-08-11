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

import PrivateRoute from './components/PrivateRoute'
import Facturacion from './components/Dashboard/Facturacion';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <>

      <UserState>
        <Router>

          <Header />

          <Switch>
            {/* RUTAS PRIVADAS */}
            <PrivateRoute exact path="/dashboard/facturacion" component={Facturacion} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />          

            {/* RUTAS DE AUTENTICACIÓN */}
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />

            {/* RUTAS PÚBLICAS */}
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </UserState>

    </>
  );
}

export default App;
