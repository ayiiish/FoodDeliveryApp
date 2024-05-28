import './App.css';
import Home from './screen/Home';
import Login from './screen/Login';
import Signup from './screen/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route


} from "react-router-dom";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/signup' element={<Signup />}></Route>
        </Routes>
      </div>
      
    </Router>
    
        
  );
  
}

export default App;
