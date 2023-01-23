import React from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import More from "./More";
import DishesDB from "../assets/DishesDB";
import Articletype from "../typings/Articletype";
import "./PopDishes.css"

const PopDishes: React.FC = () => {
  return (
    <div>
      <div className="pop-dishes-head">
        <h2>Everyone's Dishes</h2>
        <More></More>
      </div>
      <Container>
        <Row xs={1} sm={2}>
          {DishesDB.map((i: Articletype, index: number) => {
            return (
              <div key={index} className="pop-dishes-dish">
                <Link to={`/recipes/${i.name}`}>
                  <img className="pop-dishes-img" src={i.url} alt={i.title} />
                </Link>
                <div className="pop-dishes-text-container">
                  <Link to={`/recipes/${i.name}`}>
                    <div id="pop-dishes-text" className="pop-dishes-title">
                      {i.title}
                    </div>
                  </Link>
                  <Link to={`/recipes/${i.name}`}>
                    <div className="pop-dishes-content">
                      {i.content}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default PopDishes;
