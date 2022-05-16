import { React } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Navigation from "./components/Navigation.js";

import Card from "./components/Card.js";

function App() {
  const imgSrc = "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/card_legend/Card_legend_00_0.png";
  const acquisition = [
    "[업적 달성] 흉가 체험",
    "[대항해] 악몽을 떠도는 유령선",
    "[대항해] 그림자를 헤매는 유령선",
    "[대항해] 폭풍을 부르는 유령선",
    "[대항해] 죄를 짊어진 유령선",
    "[군단장 레이드] 몽환군단장 아브렐슈드"
  ];

  return (
    <BrowserRouter basename={process.env.REACT_APP_URL_BASE}>
      <Navigation />
      <div className="container">
        <div className="row">
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(0)} imgSrc={imgSrc} count={Number(0)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(1)} imgSrc={imgSrc} count={Number(1)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(2)} imgSrc={imgSrc} count={Number(2)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(3)} imgSrc={imgSrc} count={Number(3)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(4)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(5)} acquisition={acquisition} /></div>
        </div>
        <div className="row">
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(6)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(7)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(8)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(9)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(10)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(11)} acquisition={acquisition} /></div>
        </div>
        <div className="row">
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(12)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(13)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(14)} acquisition={acquisition} /></div>
          <div className="col"><Card name="광기를 잃은 쿠크세이튼" grade={Number(4)} imgSrc={imgSrc} count={Number(15)} acquisition={acquisition} /></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
