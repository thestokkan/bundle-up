import React, { useState,useRef } from "react";
import ClothTag from "./ClothTag";
// import {Cloth } from "../Clothes/Clothes";
import type { Cloth } from "../Recommandation/Recommandation";
import "./ClothesList.css"
import { Modal } from "../Modal";
import { useOutsideAlerter } from "../../utils/hooks";

const MiniInfo=({cloth}:{cloth:Cloth})=>{

  return(

    <>
      <img className="modal-image" style={{zIndex:11}}src={cloth.path} alt={cloth.name}/>
      <p className="info-text">{cloth.info}</p>
    </>

  )

}

const ClothesList = ({clothes,styles}:{clothes:Array<Cloth>,styles:Array<React.CSSProperties>}) => {

  

  //useState(true)
  const [mod,setMod] =useState(false)
  const [cloth,setCloth] =useState<Cloth|null>(null)
  const modRef=useRef(null)
  useOutsideAlerter(modRef,()=>setMod(false))

  const modal=(open:boolean
    )=>{
     const c= <p>hei</p>
    if (open){
      

      return ( <Modal mref={modRef} title={cloth?.name} closeModal={ ()=>setMod(false)} isOpen={true}>
        {cloth? <MiniInfo cloth={cloth}/>:null}
        </Modal>)

    }else return null
  }

  const oc =(cloth : Cloth)=>{

    return ()=>{
      setMod(true)
      setCloth(cloth)

    }

  }

  return (
    <>
    <div className="clothes-list">
      
      {clothes.map((c,i) => (
        <ClothTag style={styles[i]} classname={["tag-show"]}
         clothes={c.name} key={c.id} click={oc(c)} />
      ))}
    </div>
    {modal(mod)}
    </>
  );
};

export default ClothesList;