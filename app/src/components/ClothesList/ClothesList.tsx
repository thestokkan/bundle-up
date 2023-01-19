import React from "react";
import ClothTag from "./ClothTag";
import { useState, useEffect } from "react";
import {Cloth } from "../Clothes/Clothes";

type InProp={
  clothes:Cloth[]
}

// const clothes = [
//   "Innerlag",
//   "Mellomlag",
//   "Skalljakke/dress",
//   "Vinterjakke/dress",
//   "Regntøy",
//   "Lue/votter",
// ] as const;

// export type AllClothes = typeof clothes[number];

// const prioMap = new Map<AllClothes, number>();
// prioMap.set("Innerlag", 1);
// prioMap.set("Mellomlag", 2);
// prioMap.set("Skalljakke/dress", 1);
// prioMap.set("Vinterjakke/dress", 1);
// prioMap.set("Regntøy", 1);
// prioMap.set("Lue/votter", 1);

// export type Cloth = {
//   cloth: AllClothes;
//   order: number;
//   id: number;
// };

// const info = [
//   {
//     id: 1,
//     name: "Innerlag",
//   },
//   {
//     id: 2,
//     name: "Mellomlag",
//   },
//   {
//     id: 3,
//     name: "Skalljakke/dress",
//   },
//   {
//     id: 5,
//     name: "Regntøy",
//   },
//   {
//     id: 6,
//     name: "Lue/votter",
//   },
// ];

// const dataTooObject = (data: typeof info) => {
//   const cloths: Cloth[] = [];

//   info.forEach((v) => {
//     cloths.push({
//       order: prioMap.get(v.name as AllClothes) as number,
//       cloth: v.name as AllClothes,
//       id: v.id,
//     });
//   });

//   cloths.sort((a, b) => a.order - b.order);

//   return cloths;
// };

const ClothesList = ({clothes}:InProp) => {

 

  const [listState, setlistState] = useState<typeof clothes>([]);
  

  const add = (cloth: Cloth,delay:number) => {
    setTimeout(()=>{setlistState((listState) => [...listState, cloth])},delay)
  };

  useEffect(() => {
    

    

    for (let i = 0; i < clothes.length; i++) {

      add(clothes[i],Math.round(i*2000));
    }
    
  }, []);

  return (
    <ul>
      
      {listState.map((c) => (
        <ClothTag classname={["show"]} clothes={c.cloth} key={c.id} />
      ))}
    </ul>
  );
};

export default ClothesList;
