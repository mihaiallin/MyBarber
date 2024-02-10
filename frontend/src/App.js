import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Login from './pages/Login';
import Navbar from './components/Navbar'

import createStore from 'react-auth-kit/createStore';
import AuthProvider from "react-auth-kit";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Team from "./pages/Team";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";

function App() {

    const store = createStore({
        authName:'_auth',
        authType:'cookie',
        cookieDomain: window.location.hostname,
        cookieSecure: false,
    });



  return (
      <div className="App">
          <div>
              <AuthProvider store={store}>
                  <Navbar />
                  <Router>
                      <Routes>
                          <Route path="*" element={<ErrorPage />} />
                          <Route path="/" element={<HomePage />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/login" element={<Login />}/>
                          <Route path="/team" element={<Team />}/>
                      </Routes>
                  </Router>
              </AuthProvider>
          </div>
          <Footer/>
      </div>
  );
}

export default App;
