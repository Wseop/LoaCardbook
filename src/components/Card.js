import { React, useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";

import "./Card.css";
import imgAwakenActive from "../assets/awaken_active.png";
import imgAwakenInactive from "../assets/awaken_inactive.png";

const countToAwaken = [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5];
const countToReserve = [0, 0, 1, 0, 1, 2, 0, 1, 2, 3, 0, 1, 2, 3, 4, 0];

const Card = (props) => {
    const [updateShow, setUpdateShow] = useState(false);
    const [count, setCount] = useState(props.count);
    const [awaken, setAwaken] = useState(0);
    const [reserve, setReserve] = useState(0);

    useEffect(() => {
        setAwaken(countToAwaken[count]);
        setReserve(countToReserve[count]);
    }, [count]);

    return (
        <Container className="m-1 p-0 fw-bold text-center card-wrap">
            <p className={"m-0 p-0 data-grade-" + props.grade}>{props.name}</p>
            <p className="m-0 p-1 bg-secondary bg-gradient card-count" style={{color: "white"}}>+{reserve}</p>
            <img className={"border-grade-" + props.grade} 
                 onClick={() => {setUpdateShow(true)}}
                 style={updateShow === true ? {opacity: "0.5"} : {opacity: "1"}}
                 src={props.imgSrc} 
                 alt="character"
                 height="280px" 
                 onMouseEnter={() => {setUpdateShow(true)}}
                 onMouseLeave={() => {setUpdateShow(false)}}/>
            <Container className="card-awaken">
            {
                [...Array(awaken)].map((v, i) => {
                    return (
                        <img key={i} src={imgAwakenActive} alt="awakenActive" className="p-1"/>
                    )
                })
            }
            {
                [...Array(5 - awaken)].map((v, i) => {
                    return (
                        <img key={i} src={imgAwakenInactive} alt="awakenInactive" className="p-1"/>
                    )
                })
            }
            </Container>
            {
                updateShow === false ? null : 
                <Container className="card-update" 
                           onMouseEnter={() => {setUpdateShow(true)}} 
                           onMouseLeave={() => {setUpdateShow(false)}}>
                    <Row className="m-0 p-0 align-items-center">
                        <Col className="m-0 p-0"><span>각성 단계</span></Col>
                        <Col>
                            <Button variant="danger" className="m-0"
                                    onClick={() => {setCount(count - awaken)}}>―</Button>
                            <Button className="m-0"
                                    onClick={() => {
                                            let next = count + awaken + 1;
                                            if (next > 15) {
                                                next = 15;
                                            }
                                            setCount(next);
                                        }}>┼</Button>
                        </Col>
                    </Row>
                    <Row className="m-0 mt-1 p-0 align-items-center">
                        <Col className="m-0 p-0"><span>보유 수량</span></Col>
                        <Col>
                            <Button variant="danger" className="m-0"
                                    onClick={() => {
                                        if (count > 0) {
                                            setCount(count - 1)
                                        }
                                    }}>―</Button>
                            <Button className="m-0"
                                    onClick={() => {
                                        if (count < 15) {
                                            setCount(count + 1)
                                        }
                                    }}>┼</Button>
                        </Col>
                    </Row>
                </Container>
            }
        </Container>
    )
};

export default Card;