import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import More from "./More";
import burger from "../assets/svg/burger.svg";
import pizza from "../assets/svg/pizza.svg";
import salad from "../assets/svg/salad.svg";
import rice from "../assets/svg/rice.svg";
import noodle from "../assets/svg/noodle.svg";
import pasta from "../assets/svg/pasta.svg";
import dumpling from "../assets/svg/dumpling.svg";
import potato from "../assets/svg/potato.svg";
import beef from "../assets/svg/beef.svg";
import lamb from "../assets/svg/lamb.svg";
import pork from "../assets/svg/pork.svg";
import chicken from "../assets/svg/chicken.svg";
import "./PopWords.css";

const POPICONS: string[] = [
  burger,
  pizza,
  salad,
  rice,
  noodle,
  pasta,
  dumpling,
  potato,
  beef,
  lamb,
  pork,
  chicken,
];

const POPCATEGORIES: string[] = [
  "burger",
  "pizza",
  "salad",
  "rice",
  "noodle",
  "pasta",
  "dumpling",
  "potato",
  "beef",
  "lamb",
  "pork",
  "chicken",
];

const PopWords: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [category, setCategory] = useState<string[]>(POPCATEGORIES);
  const getWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    if (width > 1400) {
      setCategory(POPCATEGORIES);
    } else if (width < 1400) {
      setCategory(() => POPCATEGORIES.slice(0, 8));
    }
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, [width]);

  return (
    <>
      <div
        className="pop-words-head"
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <h2>Popular Ingredients</h2>
        <More></More>
      </div>
      <div className="pop-words-grey">
        <Container style={{ marginBottom: "20px" }}>
          <Row xs={2} sm={4} lg={4} xxl={6}>
            {category.map((i, index) => {
              return (
                <Col
                  style={{ marginTop: "20px", display: "block" }}
                  key={index}
                  className="col"
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Link to={`/search/${i}`}>
                      <img
                        className="pop-words-img"
                        src={POPICONS[index]}
                        alt={i}
                      ></img>
                    </Link>
                  </div>
                  <Link to={`/search/${i}`}>
                    <div className="pop-words-text">{i}</div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PopWords;
