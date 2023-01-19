import React from "react";
import { ClothesList } from "../ClothesList";
import { useState, useEffect } from "react";
import useSWR from 'swr'

const clothes = [
    "Innerlag",
    "Mellomlag",
    "Skalljakke/dress",
    "Vinterjakke/dress",
    "Regntøy",
    "Lue/votter",
  ] as const;
  
export type AllClothes = typeof clothes[number];
  
  const prioMap = new Map<AllClothes, number>();
  prioMap.set("Innerlag", 1);
  prioMap.set("Mellomlag", 2);
  prioMap.set("Skalljakke/dress", 1);
  prioMap.set("Vinterjakke/dress", 1);
  prioMap.set("Regntøy", 1);
  prioMap.set("Lue/votter", 1);

export type Cloth = {
    cloth: AllClothes;
    order: number;
    id: number;
  };

type Input={
    id:number,
    name:AllClothes
}[] 

const dataTooObject = (data: Input) => {
    const cloths: Cloth[] = [];
  
    data.forEach((v) => {
      cloths.push({
        order: prioMap.get(v.name as AllClothes) as number,
        cloth: v.name as AllClothes,
        id: v.id,
      });
    });
  
    cloths.sort((a, b) => a.order - b.order);
  
    return cloths;
  };

  const fetcher = async (
    input: RequestInfo,
    init: RequestInit,
    ...args: any[]
  ) => {
    const res = await fetch(input, init);
    return res.json();
  };



const Clothes=()=>{
    //fetch("http://localhost:8080/getclothes").then(r=>r.json()).then(r=>(console.log(r)))
    const { data, error } = useSWR<Input>("/getclothes", fetcher)

    if(error) throw new Error("ERROR");
    if(data==undefined) return null;

    const clothes=dataTooObject(data)
    console.log(clothes)



    return(
        <ClothesList clothes={clothes}/>
    )

}

export default Clothes