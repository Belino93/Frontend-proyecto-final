import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Header from "./components/Header/Header";
import Repairs from "./containers/Repairs/Repairs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* La parte cambiante es lo que contiene Routes DENTRO */}

          {/* Cada Route contendrá una vista..... */}

          <Route path={"/"} element={<Home />} />
          <Route path={"/repairs"} element={<Repairs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
