import React from "react";
import ClothTag from "./ClothTag";
import {Cloth } from "../Clothes/Clothes";
import "./ClothesList.css"





const ClothesList = ({clothes}:{clothes:Array<Cloth>}) => {



  console.log("reerer")
 
  
  const createStyle: (delay:number,duration:number)=>React.CSSProperties= (delay,duration)=>{

    return{animationDelay:delay+"ms",
    animationDuration:duration+"ms"}

  }

 

  return (
    <div className="clothes-list">
      
      {clothes.map((c,i) => (
        <ClothTag style={createStyle(i*500,500)} classname={["tag-show"]} clothes={c.cloth} key={c.id} />
      ))}
    </div>
  );
};

export default ClothesList;
