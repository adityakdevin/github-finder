import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './Components/Layout/Navbar';
import Footer from './Components/Layout/Footer';
import Index from './Pages/Index';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import {GithubProvider} from './Context/GithubContext';

function App() {
  return (
    <GithubProvider>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar/>
          <main className="container mx-auto px3 pb12">
            <Routes>
              <Route path='/' element={<Index/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/*' element={<NotFound/>}/>
            </Routes>
          </main>
          <Footer/>
        </div>
      </Router>
    </GithubProvider>
  );
}

export default App;
