/* eslint-disable */

import { React, useEffect, useState } from "react";
import Card from "../components/Card.js";
import { useSelector } from "react-redux";
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
                            let select = [false, false, false, false, false, false, false, false, false];
                            select[i] = true;
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
            <div className="item"><span className="m-0 p-1 fs-3 fw-bold" style={{color: "white"}}>{`${name} (${props.collectCount}/${props.maxCount})`}</span></div>
            <div className="item d-flex align-items-center">
                <span className="m-0 me-2 fw-bold" style={{color: "white"}}>{`각성 단계 ${props.awakenCount}(${props.expectedAwaken}) / ${props.maxAwakenCount}`}</span>
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
    const [cards, setCards] = useState([]);

    useEffect(() => {
        let newCards = [];

        cardList.map((v, i) => {
            newCards.push(props.cardData.find(element => element.name === v));
        });

        setCards([...newCards]);
    }, [props.cardData]);

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
    const effects = props.effects;
    const awakenEffect = props.awakenEffect;
    const cardList = props.cardList;
    
    if (!props.effectShow[props.index]) return null;
    return (
        <div className="container mt-2 pt-3 rounded" style={{background: "grey"}}>
            <div className="row">
                <div className="col">
                    <div className="text-center fw-bold">
                        <p style={props.collectCount >= cardList.length || props.collectCount >= effects[0].collect ? {color: "#63E925"} : 
                                                                                                          {color: "#A9A9A9"}}>수집 효과</p>
                    </div>
                    {
                        effects.map((effect, i) => {
                            return (
                                <div key={i} className="text-center fw-bold">
                                    <p style={props.collectCount >= cardList.length || props.collectCount >= effect.collect ? {color: "white"} : 
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
                                    <p style={(props.collectCount >= cardList.length || props.collectCount >= effects[0].collect) && 
                                              (props.awakenCount >= Number(effect.count)) ? {color: "#63E925"} : 
                                                                                            {color: "#A9A9A9"}}
                                    >{`각성단계 합계 ${effect.count}`}</p>
                                    <p style={(props.collectCount >= cardList.length || props.collectCount >= effects[0].collect) && 
                                              (props.awakenCount >= Number(effect.count)) ? {color: "white"} : 
                                                                                            {color: "#A9A9A9"}}
                                    >{`${awakenEffect.category.slice(0, 2)} 계열 피해량 증가 +${effect.value}%`}</p>
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
    let cardData = useSelector(state => state.cards);

    useEffect(() => {
        let effectShow = [];

        collections.map((v, i) => {
            effectShow.push(false);
        });
        setEffectShow([...effectShow]);
    }, []);

    return (
        collections.map((v, i) => {
            // 수집 갯수 및 각성 단계 계산
            let collectCount = 0;
            let awakenCount = 0;
            v.cardList.map((cardName, i) => {
                const awaken = cardData.find(element => element.name === cardName).awaken;
                if (awaken > -1) {
                    collectCount++;
                    awakenCount += awaken;
                }
            });
            // 보유량 -> 각성 단계 환산
            let expectedAwaken = awakenCount;
            v.cardList.map((cardName, i) => {
                let card = cardData.find(element => element.name === cardName);
                let awaken = card.awaken;
                let reserve = card.reserve;

                for (let i = awaken; reserve > i; i++) {
                    reserve -= (i + 1);
                    expectedAwaken++;
                }
            });

            return (
                <div key={i} className="mb-5">
                    <Title index={i} name={v.name} collectCount={collectCount} maxCount={v.cardList.length}
                           awakenCount={awakenCount} maxAwakenCount={v.awakenEffect.effects[v.awakenEffect.effects.length - 1].count}
                           expectedAwaken={expectedAwaken}
                           effectShow={effectShow} setEffectShow={setEffectShow} />
                    <CardList cardList={v.cardList} cardData={cardData} />
                    <Effect index={i} effects={v.effects} awakenEffect={v.awakenEffect} 
                            cardList={v.cardList} cardData={cardData}
                            effectShow={effectShow}
                            collectCount={collectCount} awakenCount={awakenCount} />
                </div>
            )
        })
    )
}

const CardCollection = () => {
    const [selected, setSelected] = useState([true, false, false, false, false, false, false, false, false]);
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