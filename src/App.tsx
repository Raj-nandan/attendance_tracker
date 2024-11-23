// import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './components/SignUp';
import Login from './components/Login';
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
      <Route path = "/signup" element = { <SignUp />}/>
      <Route path = "/login" element = { <Login />}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;