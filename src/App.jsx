
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Header from "./components/Header/Header";
import Repairs from "./containers/Repairs/Repairs";
import Register from "./containers/User/Register/Register";
import Login from "./containers/User/Login/Login";
import Profile from "./containers/User/Profile/Profile";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* La parte cambiante es lo que contiene Routes DENTRO */}

          {/* Cada Route contendrá una vista..... */}

          <Route path={"/"} element={<Home />} />
          <Route path={"/repairs"} element={<Repairs />} />
          <Route path={"/register"} element={<Register/>} />
          <Route path={"/login"} element={<Login/>} />
          <Route path={"/profile"} element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
