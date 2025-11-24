import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Ministries from "./pages/Ministries"; // list
import DepartmentDetail from "./pages/DepartmentDetail"; // detail
import Events from "./pages/Events";
import Leadership from "./pages/Leadership";
import Give from "./pages/Give";
import Contact from "./pages/Contact";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main className="pt-20 md:pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Departments */}
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/departments" element={<Ministries />} />
          <Route path="/departments/:id" element={<DepartmentDetail />} />

          <Route path="/events" element={<Events />} />
          <Route path="/leadership" element={<Leadership />} />
          
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
