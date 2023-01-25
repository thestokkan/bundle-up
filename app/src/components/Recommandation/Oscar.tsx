import React from "react";

import type { ClothImg } from "./Recommandation";
import "./Oscar.css"




export const Oscar=({clothesImg, styles,day}:{day:string, styles:Array<React.CSSProperties>,clothesImg:Array<ClothImg>})=>{

    

    return(
        
        <div key={day} className="clothes-layer-container">
            <img style={{"zIndex": "0"}} className="layer-img" src="bparts/kombo7.png" alt="base.png"/>

            {clothesImg.map((k,i)=>(
                <img className="layer-img" src={k.path} style={styles[i]} alt={k.cloth}/>
            ))}
        </div>
        
    )

}

