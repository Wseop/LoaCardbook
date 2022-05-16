import { React, useEffect, useState } from "react";

import "./Card.css";
import imgAwakenActive from "../assets/awaken_active.png";
import imgAwakenInactive from "../assets/awaken_inactive.png";

const countToAwaken = [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5];
const countToReserve = [0, 0, 1, 0, 1, 2, 0, 1, 2, 3, 0, 1, 2, 3, 4, 0];

const Card = (props) => {
    const [updateShow, setUpdateShow] = useState(false);
    const [acquisitionShow, setAcquisitionShow] = useState(false);
    const [count, setCount] = useState(props.count);
    const [awaken, setAwaken] = useState(0);
    const [reserve, setReserve] = useState(0);

    useEffect(() => {
        setAwaken(countToAwaken[count]);
        setReserve(countToReserve[count]);
    }, [count]);

    return (
        <div className="card-wrap mt-2 fw-bold">
            <p className={"m-0 p-0 text-center data-grade-" + props.grade}
               style={{cursor: "pointer"}}
               onClick={() => {setAcquisitionShow(!acquisitionShow)}}>{props.name}</p>
            {
                acquisitionShow === false ? null : 
                <div className="card-acquisition bg-dark text-white p-2 pb-0">
                    <p className={"pt-2 data-grade-" + props.grade}>{props.name}</p>
                    <hr className="m-0 p-0"/>
                    <p className="pt-2">획득처</p>
                    {
                        props.acquisition.map((v, i) => {
                            return <p key={i} style={{color: "#97FFFD"}}>{v}</p>
                        })
                    }
                </div>
            }
            <span className="card-count p-1 bg-secondary bg-gradient" style={{color: "white"}}>+{reserve}</span>
            <img className={"card-img border-grade-" + props.grade} 
                 style={updateShow === true ? {opacity: "0.5"} : {opacity: "1"}}
                 src={props.imgSrc} 
                 alt="character"
                 height="240px"
                 onMouseEnter={() => {setUpdateShow(true)}}
                 onMouseLeave={() => {setUpdateShow(false)}}/>
            <div className="card-awaken">
            {
                [...Array(awaken)].map((v, i) => {
                    return (
                        <img key={i} src={imgAwakenActive} alt="awakenActive"/>
                    )
                })
            }
            {
                [...Array(5 - awaken)].map((v, i) => {
                    return (
                        <img key={i} src={imgAwakenInactive} alt="awakenInactive"/>
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
                                onClick={() => {setCount(count - awaken)}}>━</button>
                        <button className="btn btn-primary"
                                onClick={() => {
                                    let next = count + awaken + 1;
                                    if (next > 15) next = 15;
                                    setCount(next);
                                }}>┼</button>
                    </div>
                    <div className="mt-2">
                        <span className="me-2 align-middle">보유 수량</span>
                        <button className="btn btn-danger"
                                onClick={() => {if (count > 0) setCount(count - 1)}}>━</button>
                        <button className="btn btn-primary"
                                onClick={() => {if (count < 15) setCount(count + 1)}}>┼</button>
                    </div>
                </div>
            }
        </div>
    )
};

export default Card;