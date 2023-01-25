import React, { useState } from "react";
import ClothTag from "./ClothTag";
// import {Cloth } from "../Clothes/Clothes";
import type { Cloth } from "../Recommandation/Recommandation";
import "./ClothesList.css"
import { Modal } from "../Modal";






const ClothesList = ({clothes,styles}:{clothes:Array<Cloth>,styles:Array<React.CSSProperties>}) => {

  //useState(true)
  const [mod,setMod] =useState(false)



  console.log("reerer")
 

 

  return (
    <div className="clothes-list">
      
      {clothes.map((c,i) => (
        <ClothTag style={styles[i]} classname={["tag-show"]} clothes={c.cloth} key={c.id} />
      ))}
    </div>
  );
};

export default ClothesList;
