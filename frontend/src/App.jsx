import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import SignIn from "./Components/SignIn";
import Dashboard from "./Components/Dashboard";
import Send from "./Components/Send";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
