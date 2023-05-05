import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import LocationData from "./pages/LocationData";
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/location/:lcn" element={<LocationData />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
