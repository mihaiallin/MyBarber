import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import ErrorPage from "./pages/ErrorPage";
import Register from './pages/Register';
// import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </Router>
    </div>
    </div>
  );
}

export default App;
