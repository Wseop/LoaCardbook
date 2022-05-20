/* eslint-disable */

import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import collections from "../assets/card-collect.json";

const statCategory = ["힘", "민첩", "지능", "체력", "물리 방어력", "마법 방어력", "치명", "특화", "신속", "제압", "인내", "숙련"];
let statIndex = {};
statCategory.map((category, i) => {
    statIndex[category] = i;
});

const damageCategory = ["악마", "야수", "정령", "곤충", "기계", "식물", "물질", "인간", "불사"];
let damageIndex = {};
damageCategory.map((category, i) => {
    damageIndex[category] = i;
});

const countToAwaken = [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5];

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
    let stats = new Array(12);
    let damages = new Array(9);
    stats.fill(0);
    damages.fill(0);

    // 도감 수집 효과 계산
    collections.map((collection, i) => {
        let length = collection.cardList.length;
        let activeCount = 0;
        let awakenCount = 0;

        // 활성화된 카드 수 & 각성 합계 계산
        collection.cardList.map((cardName, j) => {
            let count = Number(cardData.find(element => element.name === cardName).count);

            if (count > 0) {
                activeCount++;
                awakenCount += countToAwaken[count];
            }
        });
        if (length === activeCount) {
            // 수집 효과 +
            collection.effects.map((effect, j) => {
                stats[statIndex[effect.category]]++;
            });
            // 각성 단계 효과 +
            let damageType = collection.awakenEffect.category.slice(0, 2);
            collection.awakenEffect.effects.map((effect, j) => {
                if (awakenCount >= effect.count) {
                    damages[damageIndex[damageType]] += parseFloat(effect.value);
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
                                <p key={i}>{`${damageCategory[i]} 추가 피해 : +${damages[i].toFixed(2)}%`}</p>
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
        "카드 이름을 클릭하면 획득처 조회가 가능합니다.",
        "모든 데이터는 브라우저의 로컬 저장소에 저장됩니다. (캐시 삭제 시 데이터가 날라갈 수 있습니다.)",
        "크롬 브라우저에서 사용을 권장드립니다."
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