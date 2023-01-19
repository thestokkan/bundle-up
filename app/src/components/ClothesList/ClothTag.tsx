import React from "react";
import { Cloth,AllClothes } from "../Clothes/Clothes";
import "./ClothTag.css"

type Props={
    clothes:AllClothes,
    style?:React.CSSProperties
    classname?:string[]
    
}



const ClothTag=({classname,style,clothes}:Props)=>{

    return(
        <li style={style} className={classname?.join(" ")}>{clothes}</li>
    )

}
export default ClothTag