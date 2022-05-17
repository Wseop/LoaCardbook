import { React, useEffect, useState } from "react";
import collectionData from "../assets/card-collect.json";

const CardCollection = () => {
    return (
        <div>
            {
                collectionData.map((v, i) => {
                    return <p>{v.name}</p>
                })
            }
        </div>
    )
};

export default CardCollection;