import React, { useEffect, useState } from "react";
import Wanted from "../assets/svg/wanted.svg";
import "./Banner.css";

interface BannerItemType {
  className: string;
  content?: string;
  style?: React.CSSProperties | undefined;
  parent?: string;
  element: string;
  src?: string | undefined;
  alt?: string;
}

const Banner: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return window.removeEventListener("resize", () =>
      setWidth(window.innerWidth)
    );
  }, [width]);

  const BANNERITEM: BannerItemType[] = [
    {
      className: "banner-title banner-center",
      content: "Better Call Liu",
      element: "TEXT",
    },
    {
      className: "banner-middle",
      content: "Shukun Liu",
      style: { position: "absolute" },
      parent: "banner-center",
      element: "TEXT",
    },
    {
      className: "banner-center",
      content: "Front-End Developer",
      style: { marginTop: "12px", color: "black", fontWeight: "bold" },
      element: "TEXT",
    },
    {
      className: "banner-back",
      style: { top: "5px" },
      element: "IMG",
      src: Wanted,
      alt: "wanted",
    },
  ];

  const renderBannerYellowArea = () => {
    return (
      <>
        {BANNERITEM.map((item: BannerItemType) => {
          return item.element === "TEXT" ? (
            <div key={item.content} className={item.parent}>
              <div className={item.className} style={item.style}>
                {item.content}
              </div>
            </div>
          ) : (
            width > 767 && (
              <img
                key={item.alt}
                className={item.className}
                src={item.src}
                style={item.style}
                alt={item.alt}
              />
            )
          );
        })}
      </>
    );
  };

  return (
    <div
      onClick={() =>
        window.location.assign("https://lsk21007.github.io/Portfolio/")
      }
    >
      <div className="container banner-top">{renderBannerYellowArea()}</div>
      <div className="container banner-bottom banner-center">
        Click To Read My CV
      </div>
    </div>
  );
};

export default Banner;
