import React from "react";
import ClothTag from "./ClothTag";
import { useState, useEffect } from "react";
import {Cloth } from "../Clothes/Clothes";

type InProp={
  clothes:Cloth[]
}



const ClothesList = ({clothes}:{clothes:Array<Cloth>}) => {



  console.log("reerer")



 

  
  


 
  
  const createStyle: (delay:number,duration:number)=>React.CSSProperties= (delay,duration)=>{

    return{animationDelay:delay+"ms",
    animationDuration:duration+"ms"}

  }

 

  return (
    <ul>
      
      {clothes.map((c,i) => (
        <ClothTag style={createStyle(i*500,500)} classname={["show"]} clothes={c.cloth} key={c.id} />
      ))}
    </ul>
  );
};

export default ClothesList;
