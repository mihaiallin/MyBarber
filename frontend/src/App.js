import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
// import ErrorPage from "./pages/ErrorPage";
// import Register from './pages/Register';

import Login from './pages/Login';
import Navbar from './components/Navbar'

import createStore from 'react-auth-kit/createStore';
import AuthProvider from "react-auth-kit";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";

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
                          <Route path="/register" element={<Register />} />
                          <Route path="/login" element={<Login />}/>
                      </Routes>
                  </Router>
              </AuthProvider>
          </div>
      </div>
  );
}

export default App;
