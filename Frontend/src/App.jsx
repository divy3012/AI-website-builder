import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UseGetCurrentUser from "./hooks/UseGetCurrentUser.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Generate from "./pages/Generate.jsx";
import Home from "./pages/Home";
import LiveSite from "./pages/LiveSite.jsx";
import Pricing from "./pages/Pricing.jsx";
import WebsiteEditor from "./pages/WebsiteEditor.jsx";

export const serverUrl = "https://genweb-backend.onrender.com";

function App() {
  UseGetCurrentUser();
  const { userData } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Home />}
        />
        <Route path="/generate" element={userData ? <Generate /> : <Home />} />
        <Route
          path="/editor/:id"
          element={userData ? <WebsiteEditor /> : <Home />}
        />
        <Route path="/site/:id" element={<LiveSite />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
