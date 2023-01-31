import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import More from "./More";
import ICONS from "../Constant/ICONS";
import CATEGORY from "../Constant/CATEGORY";
import "./PopWords.css";

const PopWords: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [category, setCategory] = useState<string[]>(CATEGORY);
  const getWidth = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    if (width > 1400) {
      setCategory(CATEGORY);
    } else if (width < 1400) {
      setCategory(() => CATEGORY.slice(0, 8));
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
                        src={ICONS[index]}
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
