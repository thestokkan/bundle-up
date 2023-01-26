import React from "react";

import type { Cloth } from "./Recommandation";
import "./Oscar.css"




export const Oscar=({clothesImg, styles,day}:{day:string, styles:Array<React.CSSProperties>,clothesImg:Array<Cloth>})=>{

    

    return(
        
        <div key={day} className="clothes-layer-container">
            <img style={{"zIndex": "0"}} className="layer-img" src="bparts/kombo7.png" alt="base.png"/>

            {clothesImg.map((k,i)=>(
                <img className="layer-img" src={k.path} style={styles[i]} alt={k.cloth}/>
            ))}
        </div>
        
    )

}