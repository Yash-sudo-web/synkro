import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
function App() {
  const ProtectedPrivateRoute = ({ path, element }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return element;
  };
  const ProtectedPublicRoute = ({ path, element }) => {
    const token = localStorage.getItem('token');
    if (token) {
      return <Navigate to="/app" replace />;
    }
    return element;
  };

  return (
    <>
  <Router>
    <Routes>
      <Route path="/" element= { <ProtectedPublicRoute element={<Signup />} />} />
      <Route path="/login" element= { <ProtectedPublicRoute element={<Login />} />} />
      <Route path="/app" element= { <ProtectedPrivateRoute element={<Main />} />} />
    </Routes>
  </Router>
    </>
  );
}

export default App;
