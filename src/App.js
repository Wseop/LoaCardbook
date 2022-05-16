import { React } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Navigation from "./components/Navigation.js";

import Card from "./components/Card.js";

function App() {
  const imgSrc = "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/card_legend/Card_legend_00_0.png";

  return (
    <BrowserRouter basename={process.env.REACT_APP_URL_BASE}>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(0)} imgSrc={imgSrc} count={Number(0)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(1)} imgSrc={imgSrc} count={Number(1)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(2)} imgSrc={imgSrc} count={Number(2)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(3)} imgSrc={imgSrc} count={Number(3)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(4)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(5)} /></div>
        </div>
        <div className="row">
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(6)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(7)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(8)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(9)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(10)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(11)} /></div>
        </div>
        <div className="row">
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(12)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(13)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(14)} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(15)} /></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
