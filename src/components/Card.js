/* eslint-disable */

import { React, useEffect, useState } from "react";
import "./Card.css";
import { useDispatch } from "react-redux";
import { changeAwaken, changeReserve } from "../reducers/store.js";

const maxAwaken = 5;
const maxReserve = [15, 14, 12, 9, 5, 0];

const Card = (props) => {
    let dispatch = useDispatch();

    const [updateShow, setUpdateShow] = useState(false);
    const [acquisitionShow, setAcquisitionShow] = useState(false);

    if (props.card == null) return null;
    return (
        <div className="card-wrap mt-2 fw-bold">
            <p className={"m-0 p-0 text-center data-grade-" + props.card.grade}
               style={{cursor: "pointer"}}
               onClick={() => {setAcquisitionShow(!acquisitionShow)}}>{props.card.name}</p>
            {
                acquisitionShow === false ? null : 
                <div className="card-acquisition bg-dark text-white p-2 pb-0">
                    <p className={"pt-2 data-grade-" + props.card.grade}>{props.card.name}</p>
                    <hr className="m-0 p-0"/>
                    <p className="pt-2">획득처</p>
                    {
                        props.card.acquisition.map((v, i) => {
                            return <p key={i} style={{color: "#97FFFD"}}>{v}</p>
                        })
                    }
                </div>
            }
            <span className="card-count p-1 bg-secondary bg-gradient rounded" style={{color: "white"}}>+{props.card.reserve}</span>
            <img className={"card-img border-grade-" + props.card.grade} 
                 style={updateShow === true ? {opacity: "0.5"} : 
                        props.card.awaken === -1 ? {opacity: "0.3"} : {opacity: "1"}}
                 src={process.env.PUBLIC_URL + '/images/cardImg/' + props.card.imgSrc} 
                 alt="character"
                 height="240px"
                 onMouseEnter={() => {setUpdateShow(true)}}
                 onMouseLeave={() => {setUpdateShow(false)}}/>
            <div className="card-awaken">
            {
                [...Array(props.card.awaken === -1 ? 0 : props.card.awaken)].map((v, i) => {
                    return (
                        <img key={i} src={process.env.PUBLIC_URL + '/images/awaken_active.png'} alt="awakenActive" style={{cursor:"pointer"}}
                             onClick={() => {
                                 let nextAwaken;
                                 if (props.card.awaken === 1 && i === 0) {
                                     nextAwaken = -1;
                                 } else {
                                     nextAwaken = i + 1;
                                 }
                                 dispatch(changeAwaken({name: props.card.name, awaken: nextAwaken}));
                                 dispatch(changeReserve({name: props.card.name, reserve: 0}));
                             }}/>
                    )
                })
            }
            {
                [...Array(5 - (props.card.awaken === -1 ? 0 : props.card.awaken))].map((v, i) => {
                    return (
                        <img key={i} src={process.env.PUBLIC_URL + '/images/awaken_inactive.png'} alt="awakenInactive" style={{cursor:"pointer"}}
                             onClick={() => {
                                 let nextAwaken;
                                 if (props.card.awaken === -1) {
                                    nextAwaken = i + 1;
                                 } else {
                                    nextAwaken = i + props.card.awaken + 1;
                                 }
                                 dispatch(changeAwaken({name: props.card.name, awaken: nextAwaken}));
                                 dispatch(changeReserve({name: props.card.name, reserve: 0}));
                             }}/>
                    )
                })
            }
            </div>
            {
                updateShow === false ? null : 
                <div className="card-update"
                     onMouseEnter={() => {setUpdateShow(true)}}
                     onMouseLeave={() => {setUpdateShow(false)}}>
                    <div>
                        <span className="me-2 align-middle">각성 단계</span>
                        <button className="btn btn-danger"
                                onClick={() => {
                                    let nextAwaken = props.card.awaken - 1;
                                    if (nextAwaken >= -1) {
                                        dispatch(changeAwaken({name: props.card.name, awaken: nextAwaken}));
                                        dispatch(changeReserve({name: props.card.name, reserve: 0}));
                                    }
                                }}>━</button>
                        <button className="btn btn-primary"
                                onClick={() => {
                                    let nextAwaken = props.card.awaken + 1;
                                    if (nextAwaken <= maxAwaken) {
                                        dispatch(changeAwaken({name: props.card.name, awaken: nextAwaken}));
                                        dispatch(changeReserve({name: props.card.name, reserve: 0}));
                                    }
                                }}>┼</button>
                    </div>
                    <div className="mt-2">
                        <span className="me-2 align-middle">보유 수량</span>
                        <button className="btn btn-danger"
                                onClick={() => {
                                    let nextReserve = props.card.reserve - 1;
                                    if (props.card.awaken === 0 && nextReserve === -1) {
                                        dispatch(changeAwaken({name: props.card.name, awaken: -1}));
                                    } else if (nextReserve >= 0) {
                                        dispatch(changeReserve({name: props.card.name, reserve: nextReserve}));
                                    }
                                }}>━</button>
                        <button className="btn btn-primary"
                                onClick={() => {
                                    let nextReserve = props.card.reserve + 1;
                                    if (props.card.awaken === -1) {
                                        dispatch(changeAwaken({name: props.card.name, awaken: 0}));
                                    } else if (nextReserve <= maxReserve[props.card.awaken]) {
                                        dispatch(changeReserve({name: props.card.name, reserve: nextReserve}));
                                    }
                                }}>┼</button>
                        
                    </div>
                    <div className="mt-2 text-center">
                        <button className="btn btn-success btn-sm"
                            onClick={() => {
                                if (props.card.awaken === -1) {
                                    dispatch(changeAwaken({name: props.card.name, awaken: 0}));
                                    dispatch(changeReserve({name: props.card.name, reserve: maxReserve[0]}));
                                } else {
                                    dispatch(changeReserve({name: props.card.name, reserve: maxReserve[props.card.awaken]}));
                                }
                            }}>수량 MAX</button>
                    </div>
                </div>
            }
        </div>
    )
};

export default Card;