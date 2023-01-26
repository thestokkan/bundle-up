import React, { useState } from "react";
import { Modal } from "../Modal";
import type {ClothesType } from "../Recommandation/Recommandation";
import "./ClothTag.css"

type Props={
    clothes:ClothesType | string,
    style?:React.CSSProperties
    classname?:string[]
    setmodal?:React.Dispatch<React.SetStateAction<boolean>>
    modal?:boolean
    click?:()=>void
    
}


const ClothTag=({classname,style,clothes,click}:Props)=>{
    //const [mod, setMod]=useState<boolean>(false)

    return(
        <div style={style} className={classname?.join(" ")} onClick={click}>
            {clothes}
            </div>
    )

}
export default ClothTag