import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import Alert from './Components/Layout/Alert';
import Index from './Pages/Index';
import About from './Pages/About';
import User from './Pages/User';
import NotFound from './Pages/NotFound';
import {GithubProvider} from './Context/Github/GithubContext';
import { AlertProvider } from './Context/Alert/AlertContext';


function App() {
  return (    
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar/>
            <main className="container mx-auto px3 pb12">
              <Alert />
              <Routes>
                <Route path='/' element={<Index/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/user/:login' element={<User/>}/>
                <Route path='/*' element={<NotFound/>}/>
              </Routes>
            </main>
            <Footer/>
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
