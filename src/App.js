import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; 
import HomePage from "./HomePage";
import "./App.css";
import { LanguageProvider } from './pages/LanguageContext'; // Add this import


function App() {
  return (
    // Wrap your whole app inside LanguageProvider to provide the context
    <LanguageProvider>
      <Router>
        <div className="App">
          <HomePage />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
