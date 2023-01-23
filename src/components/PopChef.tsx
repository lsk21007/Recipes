import React from "react";
import Chef from "../assets/Chef";
import Button from "./Button";
import { Link } from "react-router-dom";
import "./PopChef.css";

const PopChef: React.FC = () => {
  return (
    <div>
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <h2>Popular Chef</h2>
      </div>
      <div>
        {Chef.map((i, index) => {
          return (
            <div key={index} className="pop-chef-profile">
              <Link to={`/chef/${i.name}`}>
                <img
                  className="pop-chef-chefPhoto"
                  src={i.photo}
                  alt={i.name}
                />
              </Link>
              <div className="pop-chef-text-container">
                <Link to={`/chef/${i.name}`}>
                  <div
                    id="pop-chef-text"
                    style={{ fontSize: "20px" }}
                    className="pop-chef-name"
                  >
                    {i.name}
                  </div>
                </Link>
                <div id="pop-chef-text" style={{ fontSize: "15px" }}>
                  {i.phrase}
                </div>
              </div>
              <Link to={`/chef/${i.name}`} className="pop-chef-button">
                <Button content="Know more"></Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopChef;
