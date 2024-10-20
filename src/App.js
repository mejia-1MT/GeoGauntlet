import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
import Capital from './pages/Capital'
import Flag from './pages/Flag'
import Currency from './pages/Currency'
import Population from './pages/Population'

function App() {

  return (
    <Router>

      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/capital' element={<Capital/>}/>
        <Route path='/flag' element={<Flag/>}/>
        <Route path='/currency' element={<Currency/>}/>
        <Route path='/population' element={<Population/>}/>
        
      </Routes>

    </Router>
   
  );
}

export default App;
