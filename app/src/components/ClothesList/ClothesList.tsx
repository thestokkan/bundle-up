import React, { useState } from "react";
import ClothTag from "./ClothTag";
// import {Cloth } from "../Clothes/Clothes";
import type { Cloth } from "../Recommandation/Recommandation";
import "./ClothesList.css"
import { Modal } from "../Modal";


const MiniInfo=({cloth}:{cloth:Cloth})=>{

}



const ClothesList = ({clothes,styles}:{clothes:Array<Cloth>,styles:Array<React.CSSProperties>}) => {

  //useState(true)
  const [mod,setMod] =useState(false)
  const [cloth,setCloth] =useState<Cloth|null>(null)




  console.log("reerer")


  const modal=(open:boolean
    )=>{
     const c= <p>hei</p> 
    if (open){

      return ( <Modal  closeModal={ ()=>setMod(false)} isOpen={true}>
        {cloth? <p>{cloth?.cloth}</p>:null}
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
