import { BrowserRouter, Routes, Route } from "react-router-dom";

import PollList from "./pages/PollList";
import PollDetail from "./pages/PollDetail";
import CreatePoll from "./pages/CreatePoll";
import Results from "./pages/Results";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/polllist" element={<PollList />} />
                <Route path="/poll/:id" element={<PollDetail />} />
                <Route path="/create" element={<CreatePoll />} />
                <Route path="/results/:id" element={<Results />} />

                <Route path="/login" element={<Login />} />
                <Route path="/admindashboard" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
