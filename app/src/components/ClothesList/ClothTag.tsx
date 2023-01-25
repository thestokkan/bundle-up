import React, { useState } from "react";
import { Modal } from "../Modal";
import type {ClothesType } from "../Recommandation/Recommandation";
import "./ClothTag.css"

type Props={
    clothes:ClothesType,
    style?:React.CSSProperties
    classname?:string[]
    setmodal?:React.Dispatch<React.SetStateAction<boolean>>
    modal?:boolean
    
}


const ClothTag=({classname,style,clothes,modal,setmodal}:Props)=>{
    //const [mod, setMod]=useState<boolean>(false)



    console.log("test")



    return(
        <div style={style} className={classname?.join(" ")} onClick={()=>setmodal? setmodal(!modal): null}>{clothes}</div>
    )

}
export default ClothTag