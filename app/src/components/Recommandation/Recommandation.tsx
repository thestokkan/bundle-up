import React from "react";
import { ClothesList } from "../ClothesList";
import useSWR from "swr";
import { getWeatherDataAndClothesCombo } from "../../fetchData";
import { Oscar } from "./Oscar";
import "./Oscar.css";

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
  name: string;
};

const prioMap = new Map<ClothesType, LagInfo>();
prioMap.set("Innerlag", {
  order: 1,
  path: "bparts/Innerlag.png",
  name: "INNERLAG",
});
prioMap.set("Mellomlag", {
  order: 2,
  path: "bparts/Mellomlag.png",
  name: "INNERLAG",
});
prioMap.set("Skalljakke/dress", {
  order: 3,
  path: "bparts/Skalljakke-dress.png.png",
  name: "INNERLAG",
});
prioMap.set("Vinterjakke/dress", {
  order: 3,
  path: "bparts/Vinterjakke-dress.png",
  name: "INNERLAG",
});
prioMap.set("Regntøy", {
  order: 4,
  path: "bparts/Regnty.png",
  name: "INNERLAG",
});
prioMap.set("Lue/votter", {
  order: 5,
  path: "bparts/Lue-votter.png",
  name: "INNERLAG",
});

console.log(prioMap);

export type Cloth = {
  cloth: ClothesType;
  order: number;
  id: number;
  path: string;
  name: string;
};
// export type ClothImg = Cloth & { path: string };

type Input = {
  id: number;
  name: ClothesType;
}[];

export type Day = "Today" | "Tomorrow";

export const createStyle: (
  delay: number,
  duration: number
) => React.CSSProperties = (delay, duration) => {
  return { animationDelay: delay + "ms", animationDuration: duration + "ms" };
};

const dataTooObject = (data: Input, duration = 500, delay = 500) => {
  const clothsimg: Cloth[] = [];
  // const clothes: Cloth[] = [];

  data.forEach((v) => {
    clothsimg.push({
      order: prioMap.get(v.name as ClothesType)?.order ?? 0,
      cloth: v.name as ClothesType,
      id: v.id,
      path: prioMap.get(v.name as ClothesType)?.path ?? "bparts/OG.png",
      name: prioMap.get(v.name as ClothesType)?.name ?? "Error",
    });
  });

  clothsimg.sort((a, b) => a.order - b.order);
  const clothes = [...clothsimg];

  const listStyle: React.CSSProperties[] = clothes.map((v, i) =>
    createStyle(delay * i, duration)
  );
  const imgStyle: React.CSSProperties[] = clothsimg.map((v, i) => {
    let tempStyle = createStyle(delay * i, duration);
    return {
      animationDelay: tempStyle.animationDelay,
      animationDuration: tempStyle.animationDuration,
      zIndex: i + 1,
    };
  });

  return {
    cloths: clothes,
    clothsimg: clothsimg,
    imgStyle: imgStyle,
    listStyle: listStyle,
  };
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
  console.log("RECOMMANDATION");
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

  let { cloths, clothsimg, imgStyle, listStyle } = dataTooObject(
    data.clothesCombo[day]
  );

  return (
    <div className={classname}>
      {/* <Oscar klar={[]} /> */}
      {/* <img className="oscar" src="raingear.png" alt="rain"/> */}
      <Oscar day={day} styles={imgStyle} clothesImg={clothsimg} />
      <ClothesList key={day} clothes={cloths} styles={listStyle} />
    </div>
  );
};

export default Recommendation;
