import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>

      {/* Dark background for whole app */}
      <div style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial, sans-serif"
      }}>

        {/* Navbar shows on all pages */}
        <Navbar />

        {/* Pages switch based on URL */}
        <Routes>
          <Route path="/"        element={<Home />}    />
          <Route path="/history" element={<History />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;