import React from "react";

import type { ClothImg } from "./Recommandation";
import "./Oscar.css"



export const Oscar=({clothesImg}:{clothesImg:Array<ClothImg>})=>{

    return(
        <div className="oscar">
        <div className="clothes-layer-container">
            {clothesImg.map(k=>(
                <img className="layer-img" src={k.path} />
            ))}
        </div>
        </div>
    )

}

