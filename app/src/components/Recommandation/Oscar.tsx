import React from "react";

import type { ClothImg } from "./Recommandation";



export const Oscar=({klar}:{klar:Array<ClothImg>})=>{

    return(
        <div className="clothes-layer">
            {klar.map(k=>(
                <img src={k.path} />
            ))}
        </div>
    )

}

