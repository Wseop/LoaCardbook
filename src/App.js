import { React } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Navigation from "./components/Navigation.js";
import GrowCard from "./pages/GrowCard.js";
import CardSetEffect from "./pages/CardSetEffect.js";
import CardCollection from "./pages/CardCollection.js";
import Main from "./pages/Main.js";

function App() {
  return (
    <BrowserRouter basename={process.env.REACT_APP_URL_BASE}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/grow" element={<GrowCard />} />
        <Route path="/set" element={<CardSetEffect />} />
        <Route path="/collection" element={<CardCollection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
