import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { Hit } from "../typings/ApiType";
import "./search.css";

const Search: React.FC = () => {
  const [Api, setApi] = useState<any>("loading");
  const [width, setWidth] = useState<number>(window.innerWidth);
  const { query } = useParams();

  useEffect(() => {
    const getRes = async () => {
      const data = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=006d11be&app_key=aaa1a3965137ad834716ac628a6e6a31%09`
      );
      const res = await data.json();
      setApi(res.hits);
    };
    getRes();
    window.scrollTo(0, 0);
  }, [query]);

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const Category: string[] = [
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

  return (
    <div>
      {Api === "loading" ? (
        <div
          style={{
            width: "100%",
            height: "810px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "300px", height: "150px", objectFit: "cover" }}
            src="https://www.gurujitips.in/wp-content/uploads/2017/06/reduce-bounce-rate-loading-gif.gif"
            alt="loading"
          ></img>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexFlow: "wrap",
            }}
          >
            <div style={{ maxWidth: "900px" }}>
              <div className="search-result">
                <h2>Search results for '{query}'</h2>
              </div>
              <div>
                {Api.map((i: Hit, index: number) => {
                  return (
                    <div className="search-head" key={index}>
                      <Link to={`/recipes/${i.recipe.label}`}>
                        <img
                          src={i.recipe.images.SMALL.url}
                          alt={i.recipe.label}
                        ></img>
                      </Link>
                      <div className="search-text-container">
                        <Link to={`/recipes/${i.recipe.label}`}>
                          <div id="text" className="title">
                            {i.recipe.label}
                          </div>
                        </Link>
                        <Link to={`/recipes/${i.recipe.label}`}>
                          <div
                            className="search-content"
                            id="search-text"
                            style={{ height: "50px" }}
                          >
                            {i.recipe.ingredientLines.map(
                              (j: string, jndex: number) => {
                                return (
                                  <div id="search-text" key={jndex}>
                                    {j}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {width > 768 && (
              <div className="search-sidebar">
                <h2 style={{ paddingLeft: "12px" }}>Hot Words</h2>
                <Container>
                  <Row lg={1} xl={2}>
                    {Category.map((i, index) => (
                      <Link
                        key={index}
                        to={`/search/${i}`}
                        style={{ marginBottom: "20px" }}
                      >
                        <Button content={i}></Button>
                      </Link>
                    ))}
                  </Row>
                </Container>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
