/* eslint-disable */

import { React, useEffect, useState } from "react";
import Card from "../components/Card.js";
import { useSelector } from "react-redux";

const numberToGrade = ["전설", "영웅", "희귀", "고급", "일반"];
const gradeColor = ["#F39303", "#BF00FE", "#0091cc", "#6FC300", "grey"];

const Tab = (props) => {
    return (
        props.selected.map((v, i) => {
            return (
                <button key={i}
                    className="btn btn-lg me-1" 
                    style={
                        v === true ? {background: gradeColor[i], border: "1px solid " + gradeColor[i], color: "white"} : 
                                     {background: "white", border: "1px solid " + gradeColor[i], color: gradeColor[i]}}
                    onClick={() => {
                        let select = props.selected;
                        select[i] = !select[i];
                        props.setSelected([...select]);
                    }}>{numberToGrade[i]}</button>
            )
        })
    )
};

const Content = (props) => {
    const rows = props.cards.length === 0 ? 0 : Math.floor(((props.cards.length - 1) / 6) + 1);

    if (rows > 0) {
        return (
            <div className="container mt-3 mb-2">
                <p className="m-0 fs-4 fw-bold rounded text-center "
                   style={{background: gradeColor[props.grade], color: "white"}}>{numberToGrade[props.grade]} 카드</p>
                {
                    [...Array(rows)].map((v, i) => {
                        return (
                            <div key={i} className="row">
                                {
                                    [...Array(6)].map((u, j) => {
                                        let index = (i * 6) + j;
                                        if (index >= props.cards.length) {
                                            return <div key={j} className="col"></div>;
                                        } else {
                                            return (
                                                <div key={j} className="col">
                                                    <Card card={props.cards[index]} />
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return null;
    }
};

const GrowCard = () => {
    const [legendCards, setLegendCards] = useState([]);
    const [epicCards, setEpicCards] = useState([]);
    const [rareCards, setRareCards] = useState([]);
    const [uncommonCards, setUncommonCards] = useState([]);
    const [commonCards, setCommonCards] = useState([]);
    const [selected, setSelected] = useState([true, true, true, true, true]);
    const cardListMap = [legendCards, epicCards, rareCards, uncommonCards, commonCards];
    let cardData = useSelector(state => state.cards);

    if (cardData == null) return null;

    useEffect(() => {
        let common = [];
        let uncommon = [];
        let rare = [];
        let epic = [];
        let legend = [];

        cardData.map((card, i) => {
            let grade = Number(card.grade);

            switch (grade) {
                case 0:
                    common.push(card);
                    break;
                case 1:
                    uncommon.push(card);
                    break;
                case 2:
                    rare.push(card);
                    break;
                case 3:
                    epic.push(card);
                    break;
                case 4:
                    legend.push(card);
                    break;
            }
        });
        setCommonCards([...common]);
        setUncommonCards([...uncommon]);
        setRareCards([...rare]);
        setEpicCards([...epic]);
        setLegendCards([...legend]);
    }, [cardData]);

    return (
        <div className="container">
            <div className="m-3 text-center">
                <button className="btn btn-primary btn-lg me-1" 
                        onClick={() => {
                            let select = selected;
                            select.map((v, i) => {select[i] = true});
                            setSelected([...select]);
                        }}>전체</button>
                <Tab selected={selected} setSelected={setSelected}/>
            </div>
            {
                selected.map((v, i) => {
                    if (v) {
                        return <Content key={i} grade={i} cards={cardListMap[i]}/>
                    } else {
                        return null;
                    }
                })
            }
        </div>
    )
};

export default GrowCard;