import React from "react";

import type { Cloth } from "./Recommandation";
import "./Oscar.css";

export const Oscar = ({
  clothesImg,
  styles,
  day,
}: {
  day: string;
  styles: Array<React.CSSProperties>;
  clothesImg: Array<Cloth>;
}) => {
  // clothesImg.filter(c=>c.cloth=="Mellomlag")
  let path = "bparts/comboMain.png";

  if (clothesImg.length <= 2) {
    const temc = clothesImg.filter((c) => c.cloth == "Mellomlag");

    if (temc.length == 1) {
      path = "bparts/transvarm.png";
      console.log("changed");
      clothesImg.forEach((c) => {
        if (c.cloth == "Mellomlag") {
          c.path = "bparts/varm_full.png";
        }
      });
    }
  }

  return (
    <div key={day} className="clothes-layer-container">
      
        <img
          key="base"
          style={{ zIndex: "0" }}
          className="layer-img"
          src={path}
          alt="base.png"
        />
     
      {clothesImg.map((k, i) => (
        <img
          key={k.id}
          className="layer-img"
          src={k.path}
          style={styles[i]}
          alt={k.cloth}
        />
      ))}
    </div>
  );
};
