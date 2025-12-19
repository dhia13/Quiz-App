import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin/Admin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
