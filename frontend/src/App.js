import "animate.css";
import "aos/dist/aos.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../src/index.css";
import "./App.css";

import ForgotPassword from "./authentication/Forgotpassword";
import Login from "./authentication/login";
import Registration from "./authentication/Registration";
import BuyBot from "./dashboard/BuyBot";
import Dashboard from "./dashboard/Dashboard";
import { routes } from "./routes/Routes";

const App = () => {
  const user = localStorage.getItem("logindataen");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<BuyBot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      
        {/* Protected Routes */}
        {user ? (
          routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.element} />
          ))
        ) : (
          <Route path="*" element={<Dashboard />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
