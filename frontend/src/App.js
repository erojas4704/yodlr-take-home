import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import SignUp from './SignUp';

function App() {
  useEffect(() => {

    const getUsers = async () => {
      const ef = await axios.get('/users');
      console.log(ef.data);
    }
    getUsers();
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact element={<Home/>} />
          <Route path="/admin" exact element={<Admin/>} />
          <Route path="/signup" exact element={<SignUp/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
