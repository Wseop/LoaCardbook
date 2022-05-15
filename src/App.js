import { React } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Navigation from "./components/Navigation.js";

import { Container, Row, Col } from "react-bootstrap";
import Card from "./components/Card.js";

function App() {
  const imgSrc = "https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/card_legend/Card_legend_00_0.png";

  return (
    <BrowserRouter basename={process.env.REACT_APP_URL_BASE}>
      <Navigation />
      <Container>
        <Row>
          <Col><Card name="광기를 잃은 쿠크세이튼" imgSrc={imgSrc} count={Number(0)} grade="0"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(1)} grade="1"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(2)} grade="2"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(3)} grade="3"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(4)} grade="4"/></Col>
        </Row>
        <Row>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(5)} grade="4"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(6)} grade="4"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(7)} grade="4"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(8)} grade="4"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(9)} grade="4"/></Col>
        </Row>
        <Row>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(10)} grade="4"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(11)} grade="4"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(12)} grade="4"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(13)} grade="4"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(14)} grade="4"/></Col>
        </Row>
        <Row>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(15)} grade="4"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(0)} grade="4"/></Col>
          <Col><Card name="TEST" imgSrc={imgSrc} count={Number(1)} grade="4"/></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
