import React from "react";
import { ClothesList } from "../ClothesList";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { getWeatherDataAndClothesCombo } from "../../fetchData";

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
prioMap.set("Skalljakke/dress", 3);
prioMap.set("Vinterjakke/dress", 3);
prioMap.set("Regntøy", 3);
prioMap.set("Lue/votter", 4);

export type Cloth = {
  cloth: AllClothes;
  order: number;
  id: number;
};

type Input = {
  id: number;
  name: AllClothes;
}[];

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

const Clothes = ({ location, day }: { location: String; day: string }) => {
  const { data, isLoading, error } = useSWR<any>(
    location,
    getWeatherDataAndClothesCombo
  );

  if (error) return null;
  if (data==undefined) {

    return (
      <div className="clothes-list">
        <div className="empty-tag"></div>
      </div>
    );
  }

  let clothes = dataTooObject(data.clothesCombo[day]);

  return <ClothesList clothes={clothes} />;
};

export default Clothes;