/* eslint-disable */

import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import collections from "../assets/card-collect.json";

const statCategory = ["힘", "민첩", "지능", "체력", "물리 방어력", "마법 방어력", "치명", "특화", "신속", "제압", "인내", "숙련"];
let statIndex = {};
statCategory.map((category, i) => {
    statIndex[category] = i;
});

const damageCategory = ["인간", "악마", "물질", "불사", "식물", "곤충", "정령", "야수", "기계"];
let damageIndex = {};
damageCategory.map((category, i) => {
    damageIndex[category] = i;
});

const Title = (props) => {
    return (
        <div className="container mt-2" style={{background: "grey"}}>
            <p className="m-0 p-1 fs-3 fw-bold text-center" style={{color: "white"}}>{props.title}</p>
            <hr className="m-0 p-0" />
        </div>
    )
};

const Content = (props) => {
    let cardData = useSelector(state => state.cards);
    let stats = new Array(statCategory.length);
    let damages = new Array(damageCategory.length);
    let expectedDamages = new Array(damageCategory.length);
    stats.fill(0);
    damages.fill(0);
    expectedDamages.fill(0);

    // 도감 수집 효과 계산
    collections.map((collection, i) => {
        let length = collection.cardList.length;
        let activeCount = 0;
        let awakenCount = 0;

        // 활성화된 카드 수 & 각성 합계 계산
        collection.cardList.map((cardName, j) => {
            let awaken = cardData.find(element => element.name === cardName).awaken;

            if (awaken > -1) {
                activeCount++;
                awakenCount += awaken;
            }
        });
        if (length === activeCount || activeCount === Number(collection.effects[0].collect)) {
            // 수집 효과 +
            collection.effects.map((effect, j) => {
                stats[statIndex[effect.category]] += Number(effect.value);
            });
            // 각성 단계 효과 +
            let damageType = collection.awakenEffect.category.slice(0, 2);
            collection.awakenEffect.effects.map((effect, j) => {
                if (awakenCount >= effect.count) {
                    damages[damageIndex[damageType]] += parseFloat(effect.value);
                }
            });
        }
        // 보유량 -> 각성 단계 환산 & 예상 합계 계산
        let expectedAwaken = awakenCount;
        collection.cardList.map((cardName, j) => {
            let card = cardData.find(element => element.name === cardName);
            let awaken = card.awaken;
            let reserve = card.reserve;

            for (let i = awaken; reserve > i; i++) {
                reserve -= (i + 1);
                expectedAwaken++;
            }
        });
        if (length === activeCount || activeCount === Number(collection.effects[0].collect)) {
            let damageType = collection.awakenEffect.category.slice(0, 2);
            collection.awakenEffect.effects.map((effect, j) => {
                if (expectedAwaken >= effect.count) {
                    expectedDamages[damageIndex[damageType]] += parseFloat(effect.value);
                }
            });
        }
    });

    return (
        <div className="container pt-3 text-center fw-bold" style={{background: "grey", color: "white"}}>
            <div className="row">
                <div className="col">
                    {
                        [...Array(6)].map((v, i) => {
                            return (
                                <p key={i} >{`${statCategory[i]} : +${stats[i]}`}</p>
                            )
                        })
                    }
                </div>
                <div className="col">
                    {
                        [...Array(6)].map((v, i) => {
                            let index = i + 6
                            return (
                                <p key={i}>{`${statCategory[index]} : +${stats[index]}`}</p>
                            )
                        })
                    }
                </div>
                <div className="col">
                    {
                        [...Array(9)].map((v, i) => {
                            return (
                                <p key={i}>{`${damageCategory[i]} 추가 피해 : +${damages[i].toFixed(2)}% (+${expectedDamages[i].toFixed(2)}%)`}</p>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const Guide = () => {
    let guides = [
        "[메인] | 추가 피해 ()안의 숫자는 현재 보유중인 카드를 최대로 각성 했을 시 가능한 수치를 의미합니다.",
        "[카드] | 카드 이름을 클릭하면 획득처 조회가 가능합니다.",
        "[카드] | 각성 단계 설정 시, 카드 아래 보석 모양을 눌러서 한 번에 설정이 가능합니다.",
        "[카드] | 수량 MAX 버튼 클릭 시, 현재 설정된 각성 단계에서 가능한 최대 수량으로 세팅됩니다.",
        "[세트] | 각성 단계의 ()안의 숫자는 현재 보유중인 카드를 최대로 각성 했을 시 가능한 각성 단계를 의미합니다.",
        "[도감] | 각성 단계의 ()안의 숫자는 현재 보유중인 카드를 최대로 각성 했을 시 가능한 각성 단계를 의미합니다.",
        "[기타] | 모든 데이터는 사용중인 브라우저의 로컬 저장소에 저장됩니다. (개인 PC에 저장됩니다.)",
        "[기타] | PC 크롬 브라우저에서 사용을 권장드립니다."
    ];

    return (
        <div className="container pt-3 pb-1 text-start fw-bold" style={{background: "grey", color: "white"}}>
            {
                guides.map((guide, i) => {
                    return (
                        <p key={i}>&bull;&nbsp;{guide}</p>
                    )
                })
            }
        </div>
    )
};

const Main = () => {
    return (
        <div className="container">
            <Title title="도감 수집 효과" />
            <Content />
            <Title title="사용 Guide" />
            <Guide />
        </div>
    )
};

export default Main;