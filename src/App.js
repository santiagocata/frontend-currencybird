import Invite from "./components/Invite";
import Register from "./components/Register";
import List from "./components/List";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register/invite/:token" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/invite" element={<Invite />} />
        <Route path="/list" element={<List />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    </>
  );
}

export default App;
