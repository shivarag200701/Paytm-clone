import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";
import SignIn from "./Components/SignIn";
import Dashboard from "./Components/Dashboard";
import Send from "./Components/Send";

import LandingPage from "./Components/LandingPage";

function App() {
  // useEffect(() => {
  //   async function fetchLoggedIn() {
  //     const res = await axios.get("http://localhost:3001/api/v1/me", {});
  //   }
  // });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
