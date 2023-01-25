import React from "react";
import { Cloth,AllClothes } from "../Clothes/Clothes";
import "./ClothTag.css"

type Props={
    clothes:AllClothes,
    style?:React.CSSProperties
    classname?:string[]
    
}


const ClothTag=({classname,style,clothes}:Props)=>{
    console.log("test")

    return(
        <div style={style} className={classname?.join(" ")}>{clothes}</div>
    )

}
export default ClothTag