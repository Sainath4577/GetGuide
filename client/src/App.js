import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import LocationData from "./pages/Loc";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/loc/:lt/:ln" element={<LocationData />} />
          <Route exact path="/signin" element={<Login />} />
          <Route exact path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
