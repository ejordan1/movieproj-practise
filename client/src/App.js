import {BrowserRouter, Routes, Route} from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";
import Login from "./pages/Login";
import "./style.css";

function App() {
  return (
    <div className="App">
      {
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>
    </BrowserRouter>
    }
    </div>
  );
}

export default App;
 