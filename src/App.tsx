// import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return (
    // <>
    //   <Toaster position="top-right" />
    //   {/* <Dashboard /> */}

    //   <Home />
    // </>
    <BrowserRouter>
    <Routes>
      <Route path= "/" element = {<Home />}/>
      <Route path = "/dashboard" element = { <Dashboard />}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;