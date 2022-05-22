/* eslint-disable */

import { React, useEffect, useState } from "react";
import Card from "../components/Card.js";
import { useSelector } from "react-redux";
import cardSetData from "../assets/card-set.json";

const Content = (props) => {
    const maxCount = props.cardSet.effects[props.cardSet.effects.length - 1].count;
    let highCards = [];
    let awakenCount = 0;

    // 보유량이 높은 카드 maxCount개 추출
    // 각성 단계 내림차순으로 정렬
    let sortedCard = [...props.cardSet.cardList];
    sortedCard.sort((a, b) => {
        const aAwaken = props.cardData.find(element => element.name === a).awaken;
        const bAwaken = props.cardData.find(element => element.name === b).awaken;
        return Number(bAwaken) - Number(aAwaken);
    });
    // 1개 이상 보유한 카드 최대 maxCount개 추출
    for (let i = 0; i < maxCount; i++) {
        if (props.cardData.find(element => element.name === sortedCard[i]).awaken > -1) {
            highCards.push(sortedCard[i]);
        }
    }
    // 각성 단계 계산
    highCards.map((v, i) => {
        awakenCount += Number(props.cardData.find(element => element.name === v).awaken);
    });
    // 보유량 -> 각성 단계 환산
    let expectedAwaken = awakenCount;
    highCards.map((cardName, i) => {
        let card = props.cardData.find(element => element.name === cardName);
        let awaken = card.awaken;
        let reserve = card.reserve;

        for (let i = awaken; reserve > i; i++) {
            reserve -= (i + 1);
            expectedAwaken++;
        }
    });

    return (
        <div className="mb-5">
            <Title index={props.index} name={props.cardSet.name}
                   maxCount={maxCount} activeCardCount={highCards.length}
                   awakenCount={awakenCount} maxAwakenCount={Number(props.cardSet.awakenEffects[props.cardSet.awakenEffects.length - 1].count)}
                   expectedAwaken={expectedAwaken}
                   descShow={props.descShow} setDescShow={props.setDescShow} />
            <CardList cardList={props.cardSet.cardList} cardData={props.cardData} />
            {
                props.descShow[props.index] === false ? null :
                <Description name={props.cardSet.name} 
                             effects={props.cardSet.effects} 
                             awakenEffects={props.cardSet.awakenEffects} 
                             highCards={highCards}
                             maxCount={maxCount}
                             awakenCount={awakenCount} />
            }
        </div>
    )
};

const Title = (props) => {
    return (
        <div className="container mt-2 d-flex flex-row justify-content-between" style={{background: "grey"}}>
            <div className="item"><span className="m-0 p-1 fs-3 fw-bold" style={{color: "white"}}>{`${props.name} (${props.activeCardCount}/${props.maxCount})`}</span></div>
            <div className="item d-flex align-items-center">
                <span className="m-0 me-2 fw-bold" style={{color: "white"}}>{`각성 단계 ${props.awakenCount}(${props.expectedAwaken}) / ${props.maxAwakenCount}`}</span>
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
    const [cards, setCards] = useState([]);

    useEffect(() => {
        let newCards = [];
        props.cardList.map((v, i) => {
    
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
    return (
        <div className="container mt-2 pt-3 rounded" style={{background: "grey"}}>
            <div className="row">
                <div className="col">
                    {
                        props.effects.map((effect, i) => {
                            return (
                                <div key={i} className="text-center fw-bold">
                                    <p style={props.highCards.length >= Number(effect.count) ? {color: "#63E925"} : 
                                                                                         {color: "#A9A9A9"}}>{`${props.name} ${effect.count} 세트`}</p>
                                    <p style={props.highCards.length >= Number(effect.count) ? {color: "white"} : 
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
                                    <p style={props.highCards.length >= props.maxCount && props.awakenCount >= Number(effect.count) ? {color: "#63E925"} : 
                                                                                                                    {color: "#A9A9A9"}}>{`${props.name} ${props.maxCount} 세트 (${effect.count}각성합계)`}</p>
                                    <p style={props.highCards.length >= props.maxCount && props.awakenCount >= Number(effect.count) ? {color: "white"} : 
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
    let cardData = useSelector(state => state.cards);

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
                        <Content key={i} index={i} cardSet={v} cardData={cardData} descShow={descShow} setDescShow={setDescShow} />
                    )
                })
            }
        </div>
    )
};

export default CardSetEffect;