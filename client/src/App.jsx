import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import PrivateRoutes from "./routes/PrivateRoutes";
import { useEffect } from "react";

// app
const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/dashboard" />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
