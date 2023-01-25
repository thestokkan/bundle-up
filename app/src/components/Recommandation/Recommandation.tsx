import React from "react";
import ClothTag from "../ClothesList/ClothTag";
import { Clothes } from "../Clothes";
import { ClothesList } from "../ClothesList";
import useSWR from "swr";
import { getWeatherDataAndClothesCombo } from "../../fetchData";
import { Oscar } from "./Oscar";
import "./Oscar.css"

const clothes = [
  "Innerlag",
  "Mellomlag",
  "Skalljakke/dress",
  "Vinterjakke/dress",
  "Regntøy",
  "Lue/votter",
] as const;

export type ClothesType = typeof clothes[number];

type LagInfo = {
  order: number;
  path: string;
};

const prioMap = new Map<ClothesType, LagInfo>();
prioMap.set("Innerlag", { order: 1, path: "bparts/Innerlag.png" });
prioMap.set("Mellomlag", { order: 2, path: "bparts/Mellomlag.png" });
prioMap.set("Skalljakke/dress", {
  order: 3,
  path: "bparts/Skalljakke-dress.png.png",
});
prioMap.set("Vinterjakke/dress", {
  order: 3,
  path: "bparts/Vinterjakke-dress.png",
});
prioMap.set("Regntøy", { order: 4, path: "bparts/Regntøy.png" });
prioMap.set("Lue/votter", { order: 5, path: "bparts/Lue-votter.png" });

export type Cloth = {
  cloth: ClothesType;
  order: number;
  id: number;
};
export type ClothImg = Cloth & { path: string };

type Input = {
  id: number;
  name: ClothesType;
}[];

export type Day = "Today" | "Tomorrow";

const dataTooObject = (data: Input) => {
  const clothsimg: ClothImg[] = [];
  const clothes: Cloth[] = [];

  data.forEach((v) => {
    clothsimg.push({
      order: prioMap.get(v.name as ClothesType)?.order ?? 0,
      cloth: v.name as ClothesType,
      id: v.id,
      path: prioMap.get(v.name as ClothesType)?.path ?? "bpart/OG",
    });
  });

  clothsimg.sort((a, b) => a.order - b.order);
  clothsimg.forEach((v) => {
    clothes.push({
      order: prioMap.get(v.cloth as ClothesType)?.order ?? 0,
      cloth: v.cloth as ClothesType,
      id: v.id,
    });
  });

  return { cloths: clothes, clothsimg: clothsimg };
};

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

const Recommendation = ({
  location,
  day,
  classname,
}: {
  location: string;
  day: Day;
  classname: string;
}) => {
    console.log("RECOMMANDATION")
  const { data, isLoading, error } = useSWR<any>(
    location,
    getWeatherDataAndClothesCombo
  );

  if (error) return null;
  if (isLoading) {
    console.log("loading");
    return (
      <div className="clothes-list">
        <div className="empty-tag"></div>
      </div>
    );
  }
  if (!data) {
    console.log("dataError");
    return <div className={classname}>Error!</div>;
  }

  let { cloths, clothsimg } = dataTooObject(data.clothesCombo[day]);

  return (
    <div className={classname}>
      {/* <Oscar klar={[]} /> */}
      {/* <img className="oscar" src="raingear.png" alt="rain"/> */}
      <Oscar clothesImg={clothsimg}/>
      <ClothesList key={day} clothes={cloths} />
    </div>
  );

  
};

export default Recommendation;
