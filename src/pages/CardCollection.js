/* eslint-disable */

import { React, useEffect, useState } from "react";
import Card from "../components/Card.js";
import cardData from "../assets/card.json";
import collectionData from "../assets/card-collect.json";

const numberToType = ["악마", "야수", "정령", "곤충", "기계", "식물", "물질", "인간", "불사"];
const numberToColor = ["#DC143C", "#DC143C", "#708090", "#708090", "#708090", "#708090", "#708090", "#708090", "#708090"];

const Tab = (props) => {
    return (
        props.selected.map((v, i) => {
            return (
                <button key={i}
                        className="btn btn-lg me-1"
                        style={
                            v === true ? {background: numberToColor[i], border: "1px solid " + numberToColor[i], color: "white"} : 
                                         {background: "white", border: "1px solid " + numberToColor[i], color: numberToColor[i]}
                        }
                        onClick={() => {
                            let select = props.selected;
                            select[i] = !select[i];
                            props.setSelected([...select]);
                        }}>{numberToType[i]}</button>
            )
        })
    )
};

const Title = (props) => {
    const name = props.name;
    const index = props.index;

    return (
        <div className="container mt-2 d-flex flex-row justify-content-between" style={{background: "grey"}}>
            <div className="item"><span className="m-0 p-1 fs-3 fw-bold" style={{color: "white"}}>{name}</span></div>
            <div className="item d-flex align-items-center">
                <button className="btn btn-outline-light btn-sm fw-bold" 
                        onClick={() => {
                            let show = props.effectShow;
                            show[index] = !show[index];
                            props.setEffectShow([...show]);
                        }}>도감 수집 효과</button>
            </div>
        </div>
    )
};

const CardList = (props) => {
    const cardList = props.cardList;
    //let cards = [];
    const [cards, setCards] = useState([]);

    useEffect(() => {
        let newCards = [];

        cardList.map((v, i) => {
            newCards.push(cardData.find(element => element.name === v));
        });

        setCards([...newCards]);
    }, []);

    return (
        <div className="container">
            <div className="row">
                {
                    [...Array(6)].map((v, i) => {
                        if (i >= cards.length) {
                            return <div key={i} className="col" />;
                        } else {
                            return (
                                <div key={i} className="col">
                                    <Card card={cards[i]} />
                                </div>
                            )
                        }
                    })
                }
            </div>
            {
                cards.length <= 6 ? null : 
                <div className="row">
                    {
                        [...Array(6)].map((v, i) => {
                            let index = 6 + i;
                            if (index >= cards.length) {
                                return <div key={i} className="col" />
                            } else {
                                return (
                                    <div key={i} className="col">
                                        <Card card={cards[index]}/>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            }
        </div>
    )
};

const Effect = (props) => {
    const countToAwaken = [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5];
    const effects = props.effects;
    const awakenEffect = props.awakenEffect;
    const cardList = props.cardList;
    
    // 수집 갯수 및 각성 단계 계산
    let collectCount = 0;
    let awakenCount = 0;
    cardList.map((v, i) => {
        const count = cardData.find(element => element.name === v).count;
        if (count > 0) {
            collectCount++;
            awakenCount += countToAwaken[count];
        }
    });

    if (!props.effectShow[props.index]) return null;
    return (
        <div className="container mt-2 pt-3 rounded" style={{background: "grey"}}>
            <div className="row">
                <div className="col">
                    <div className="text-center fw-bold">
                        <p style={collectCount >= cardList.length ? {color: "#63E925"} : 
                                                                    {color: "#A9A9A9"}}>수집 효과</p>
                    </div>
                    {
                        effects.map((effect, i) => {
                            return (
                                <div key={i} className="text-center fw-bold">
                                    <p style={collectCount >= cardList.length ? {color: "white"} : 
                                                                                {color: "#A9A9A9"}}>{`${effect.category} +${effect.value}`}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col">
                    {
                        awakenEffect.effects.map((effect, i) => {
                            return (
                                <div key={i} className="text-center fw-bold">
                                    <p style={awakenCount >= Number(effect.count) ? {color: "#63E925"} : 
                                                                                            {color: "#A9A9A9"}}>{`각성단계 합계 ${effect.count}`}</p>
                                    <p style={awakenCount >= Number(effect.count) ? {color: "white"} : 
                                                                                            {color: "#A9A9A9"}}>{`${awakenEffect.category.slice(0, 2)} 계열 피해량 증가 +${effect.value}%`}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

const Content = (props) => {
    const collections = props.collections;
    const [effectShow, setEffectShow] = useState([]);

    useEffect(() => {
        let effectShow = [];

        collections.map((v, i) => {
            effectShow.push(false);
        });
        setEffectShow([...effectShow]);
    }, []);

    return (
        collections.map((v, i) => {
            return (
                <div key={i} className="mb-5">
                    <Title name={v.name} effectShow={effectShow} setEffectShow={setEffectShow} index={i} />
                    <CardList cardList={v.cardList} />
                    <Effect effects={v.effects} awakenEffect={v.awakenEffect} cardList={v.cardList} effectShow={effectShow} index={i} />
                </div>
            )
        })
    )
}

const CardCollection = () => {
    const [selected, setSelected] = useState([true, true, true, true, true, true, true, true, true]);
    const [devil, setDevil] = useState([]);
    const [beast, setBeast] = useState([]);
    const [spirit, setSpirit] = useState([]);
    const [insect, setInsect] = useState([]);
    const [machine, setMachine] = useState([]);
    const [plants, setPlants] = useState([]);
    const [material, setMaterial] = useState([]);
    const [human, setHuman] = useState([]);
    const [immortal, setImmortal] = useState([]);
    const typeMap = [devil, beast, spirit, insect, machine, plants, material, human, immortal];

    useEffect(() => {
        let newDevil = [];
        let newBeast = [];
        let newSpirit = [];
        let newInsect = [];
        let newMachine = [];
        let newPlants = [];
        let newMaterial = [];
        let newHuman = [];
        let newImmortal = [];

        collectionData.map((v, i) => {
            let type = v.awakenEffect.category.slice(0, 2);

            if (type === "악마") {
                newDevil.push(v);
            }
            else if (type === "야수") {
                newBeast.push(v);
            }
            else if (type === "정령") {
                newSpirit.push(v);
            }
            else if (type === "곤충") {
                newInsect.push(v);
            }
            else if (type === "기계") {
                newMachine.push(v);
            }
            else if (type === "식물") {
                newPlants.push(v);
            }
            else if (type === "물질") {
                newMaterial.push(v);
            }
            else if (type === "인간") {
                newHuman.push(v);
            }
            else if (type === "불사") {
                newImmortal.push(v);
            }
        });

        setDevil([...newDevil]);
        setBeast([...newBeast]);
        setSpirit([...newSpirit]);
        setInsect([...newInsect]);
        setMachine([...newMachine]);
        setPlants([...newPlants]);
        setMaterial([...newMaterial]);
        setHuman([...newHuman]);
        setImmortal([...newImmortal]);
    }, []);

    return (
        <div className="container">
            <div className="m-3 text-center">
                <button className="btn btn-lg me-2" disabled
                        style={{background: "black", border: "3px solid black", color: "white"}}>추가 피해</button>
                <Tab selected={selected} setSelected={setSelected} />
            </div>
            {
                selected.map((v, i) => {
                    if (v) {
                        return (
                            <Content key={i} collections={typeMap[i]} />
                        )
                    } else {
                        return null;
                    }
                })
            }
        </div>
    )
};

export default CardCollection;