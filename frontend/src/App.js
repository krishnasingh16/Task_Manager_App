import "animate.css";
import "aos/dist/aos.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../src/index.css";
import "./App.css";
import Login from "./authentication/login";
import Registration from "./authentication/Registration";
import Dashboard from "./dashboard/Dashboard";
import { routes } from "./routes/Routes";
import WelcomePage from "./dashboard/WelcomePage";

const App = () => {
  const user = localStorage.getItem("logindataen");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      
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
