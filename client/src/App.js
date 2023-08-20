import Signup from "./components/Signup";
import Login from "./components/Login";
import Main from "./components/Main";
import User from "./components/User";
import Redirect from "./components/Redirect";
import Test from "./components/Test";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
function App() {
  const ProtectedPrivateRoute = ({ path, element }) => {
    const token = document.cookie.split('=')[1];
    if (!token) {
      return <Navigate to="/" replace />;
    }
    return element;
  };
  const ProtectedPublicRoute = ({ path, element }) => {
    const token = document.cookie.split('=')[1];
    if (token) {
      return <Navigate to="/app" replace />;
    }
    return element;
  };

  return (
    <>
  <Router>
    <Routes>
      <Route path="/hey" element = {<Test />} />
      <Route path="/" element= { <ProtectedPublicRoute element={<Signup />} />} />
      <Route path="/login" element= { <ProtectedPublicRoute element={<Login />} />} />
      <Route path="/app" element= { <ProtectedPrivateRoute element={<Main />} />} />
      <Route path="/redirect" element= { <ProtectedPublicRoute element={<Redirect />} />} />
      <Route path="/user" element= { <ProtectedPrivateRoute element={<User />} />} />
    </Routes>
  </Router>
    </>
  );
}

export default App;
