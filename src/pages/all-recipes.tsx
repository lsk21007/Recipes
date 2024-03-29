import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import "./all-recipes.css";

const All: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [API, setApi] = useState<any>("loading");

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return window.removeEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [width]);

  useEffect(() => {
    const getApi = async () => {
      const data = await fetch(
        "https://api.edamam.com/api/recipes/v2?type=public&q=all&app_id=006d11be&app_key=aaa1a3965137ad834716ac628a6e6a31%09&random=true"
      );
      const res = await data.json();
      setApi(res.hits.slice(0, 18));
    };
    window.scrollTo(0, 0);
    getApi();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const renderLargeAllRecipes = () => {
    return API.map((i: any, index: number) => {
      return (
        <div key={index} className="all-recipes-dish">
          <Link to={`/recipes/${i.recipe.label}`}>
            <img
              className="all-recipes-img"
              src={i.recipe.image}
              alt={i.recipe.label}
            ></img>
          </Link>
          <div className="all-recipes-text-container">
            <Link to={`/recipes/${i.recipe.label}`}>
              <div style={{ color: "black" }} className="all-recipes-title">
                {i.recipe.label}
              </div>
            </Link>
            <Link to={`/recipes/${i.recipe.label}`}>
              <div style={{ color: "black" }} className="all-recipes-content">
                {i.recipe.ingredientLines[0]}
              </div>
            </Link>
          </div>
        </div>
      );
    });
  };

  const renderRefreshButton = () => {
    return (
      <div id="all-recipes-center" style={{ margin: 0 }}>
        <button className="all-recipes-btn" onClick={refreshPage}>
          <div className="all-recipes-text">REFRESH</div>
        </button>
      </div>
    );
  };

  const renderSmallAllRecipes = () => {
    return API.slice(0, 16).map((i: any, index: number) => {
      return (
        <div key={index} className="all-recipes-dish">
          <img
            className="all-recipes-img"
            src={i.recipe.image}
            alt={i.recipe.label}
          ></img>
          <div className="all-recipes-text-container">
            <div className="all-recipes-title">{i.recipe.label}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {API === "loading" ? (
        <Loading />
      ) : (
        <>
          <h2 id="all-recipes-center">All Recipes</h2>
          <div className="all-recipes-top">
            <Container className="all-recipes-container">
              <Row xs={2} md={4} xxl={6}>
                {width > 1399
                  ? renderLargeAllRecipes()
                  : renderSmallAllRecipes()}
              </Row>
              {renderRefreshButton()}
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default All;
