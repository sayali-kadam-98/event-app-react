//import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import MyEvents from './components/MyEvents';
import Explore from './components/Explore';
import Booking from './components/Book';
import Profile from './components/Profile';
import LogOut from './components/Logout';
import Landing from './components/Landing'
//import Forget from './components/Forget'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path ="/login" component={Login}/>
          <Route path ="/signup" component={Signup}/>
          <Route path ="/Myevents" component={MyEvents}/>
          <Route path ="/Explore" component={Explore}/>
          <Route path ="/Book" component={Booking}/>
          <Route path ="/Profile" component={Profile}/>
          <Route path ="/Logout" component={LogOut}/>
          <Route path="/" component={Landing}/>
        </Switch>
      </div>      
    </Router>
  );
}

export default App;
