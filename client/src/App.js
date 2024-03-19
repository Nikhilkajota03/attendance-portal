import "./App.css";
import Signin from "../src/page/Signin";
import Attendance from "./page/Attendance";
import Navbar from "./page/Navbar";
import Signup from "./page/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Signin />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Attendance />} />
        </Routes>
      </Router>

      {/* <Navbar/>
     <Signin/>
     <Signup/>
     <Attendance/> */}
    </div>
  );
}

export default App;
