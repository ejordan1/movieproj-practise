import {BrowserRouter, Routes, Route} from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Login2 from "./pages/Login2";
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
          <Route path="/login2" element={<Login2/>}></Route>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>
    </BrowserRouter>
    }
    </div>
  );
}

export default App;
 