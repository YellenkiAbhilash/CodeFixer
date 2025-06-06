import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CodeExplanation from "./components/CodeExplanation";
import ErrorFinder from "./components/ErrorFinder";
import ErrorFixer from "./components/ErrorFixer";
import CodeOptimizer from "./components/CodeOptimizer";
import LanguageTranslator from "./components/LanguageTranslator";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code-explanation" element={<CodeExplanation />} />
        <Route path="/error-finder" element={<ErrorFinder />} />
        <Route path="/error-fixer" element={<ErrorFixer />} />
        <Route path="/code-optimizer" element={<CodeOptimizer />} />
        <Route path="/language-translator" element={<LanguageTranslator />} />
      </Routes>
    </Router>
  );
};

export default App;
