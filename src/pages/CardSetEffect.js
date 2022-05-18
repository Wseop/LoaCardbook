/* eslint-disable */

import { React, useEffect, useState } from "react";
import Card from "../components/Card.js";
import cardData from "../assets/card.json";
import cardSetData from "../assets/card-set.json";

const Title = (props) => {
    return (
        <div className="container mt-2 d-flex flex-row justify-content-between" style={{background: "grey"}}>
            <div className="item"><span className="m-0 p-1 fs-3 fw-bold" style={{color: "white"}}>{props.name}</span></div>
            <div className="item d-flex align-items-center">
                <button className="btn btn-outline-light btn-sm fw-bold" 
                        onClick={() => {
                            let desc = [...props.descShow];
                            desc[props.index] = !desc[props.index];
                            props.setDescShow([...desc]);
                        }}>세트 효과</button>
            </div>
        </div>
    )
};
const CardList = (props) => {
    let cards = [];

    props.cardList.map((v, i) => {
        cards.push(cardData.find(element => element.name === v));
    });

    return (
        <div className="container">
            <div className="row">
                {
                    [...Array(6)].map((v, i) => {
                        if (i >= cards.length) {
                            return <div key={i} className="col"></div>
                        } else {
                            return (
                                <div key={i} className="col">
                                    <Card card={cards[i]}/>
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
                                return <div key={i} className="col"></div>
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
const Description = (props) => {
    const countToAwaken = [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5];
    const maxCount = props.effects[props.effects.length - 1].count;
    let highCards = [];
    let awakenCount = 0;

    // 보유량이 높은 카드 maxCount개 추출
    // 각성 단계 내림차순으로 정렬
    props.cardList.sort((a, b) => {
        const aCount = cardData.find(element => element.name === a).count;
        const bCount = cardData.find(element => element.name === b).count;
        return Number(bCount) - Number(aCount);
    });
    // 1개 이상 보유한 카드 최대 maxCount개 추출
    for (let i = 0; i < maxCount; i++) {
        if (cardData.find(element => element.name === props.cardList[i]).count > 0) {
            highCards.push(props.cardList[i]);
        }
    }
    // 각성 단계 계산
    highCards.map((v, i) => {
        awakenCount += countToAwaken[Number(cardData.find(element => element.name === v).count)];
    });

    return (
        <div className="container mt-2 pt-3 rounded" style={{background: "grey"}}>
            <div className="row">
                <div className="col">
                    {
                        props.effects.map((effect, i) => {
                            return (
                                <div key={i} className="text-center fw-bold">
                                    <p style={highCards.length >= Number(effect.count) ? {color: "#63E925"} : 
                                                                                         {color: "#A9A9A9"}}>{`${props.name} ${effect.count} 세트`}</p>
                                    <p style={highCards.length >= Number(effect.count) ? {color: "white"} : 
                                                                                         {color: "#A9A9A9"}}>{effect.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col">
                    {
                        props.awakenEffects.map((effect, i) => {
                            return (
                                <div key={i} className="text-center fw-bold">
                                    <p style={awakenCount >= Number(effect.count) ? {color: "#63E925"} : 
                                                                                    {color: "#A9A9A9"}}>{`${props.name} ${maxCount} 세트 (${effect.count}각성합계)`}</p>
                                    <p style={awakenCount >= Number(effect.count) ? {color: "white"} : 
                                                                                    {color: "#A9A9A9"}}>{effect.description}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
};

const CardSetEffect = () => {
    const [descShow, setDescShow] = useState([]);

    useEffect(() => {
        let desc = [];

        cardSetData.map((v, i) => {
            desc.push(false);
        });
        setDescShow([...descShow, ...desc]);
    }, []);

    return (
        <div className="container">
            {
                cardSetData.map((v, i) => {
                    return (
                        <div key={i} className="mb-5">
                            <Title index={i} name={v.name} descShow={descShow} setDescShow={setDescShow} />
                            <CardList cardList={v.cardList} />
                            {
                                descShow[i] === false ? null :
                                <Description name={v.name} effects={v.effects} awakenEffects={v.awakenEffects} cardList={v.cardList} />
                            }
                        </div>
                    )
                })
            }
        </div>
    )
};

export default CardSetEffect;