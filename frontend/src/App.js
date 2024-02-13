import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import RequireAuth from "@auth-kit/react-router/RequireAuth";

import Login from './pages/Login';
import Navbar from './components/Navbar'
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Team from "./pages/Team";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Appointment from "./pages/Appointment";
import TermsOfService from "./pages/TermsOfService";
import PrivacyAndPolicy from "./pages/PrivacyAndPolicy";

function App() {

  return (
      <div className="App">
          <div>
              <Navbar />
                  <div>
                  <Router>
                      {/*<Navbar />*/}
                      <Routes>
                          <Route path="*" element={<ErrorPage />} />
                          <Route path="/" element={<HomePage />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/login" element={<Login />}/>
                          <Route path="/team" element={<Team />}/>
                          <Route path="/terms-of-service" element={<TermsOfService />}/>
                          <Route path="/privacy-and-policy" element={<PrivacyAndPolicy />}/>

                          <Route path={'/appointment'} element={
                              <RequireAuth fallbackPath={'/login'}>
                                  <Appointment/>
                              </RequireAuth>
                          }/>

                      </Routes>
                  </Router>
                  </div>
          </div>
          <Footer/>
      </div>
  );
}

export default App;
