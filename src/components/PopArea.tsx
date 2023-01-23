import React, { useEffect, useState } from "react";
import PopChef from "./PopChef";
import PopWords from "./PopWords";
import PopDishes from "./PopDishes";
import "./PopArea.css"

const PopArea: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const getWidth = () => {
    setWidth(() => window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  });
  return (
    <div className="container">
      <div className="pop-area-inside">
        {width > 992 ? (
          <div className="pop-area-left">
            <PopWords />
            <PopDishes />
          </div>
        ) : (
          <div style={{ marginRight: 0 }}>
            <PopWords />
            <PopDishes />
          </div>
        )}
        {width > 992 && (
          <div className="pop-area-right">
            <PopChef />
          </div>
        )}
      </div>
    </div>
  );
};

export default PopArea;
