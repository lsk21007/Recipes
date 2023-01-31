import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Chef from "../assets/Chef";
import { Container } from "react-bootstrap";
import ArticlesDB from "../assets/ArticlesDB";
import Articletype from "../typings/Articletype";
import "./chef-porfolio.css";

const Person: React.FC = () => {
  const [chef, setChef] =
    useState<{ name: string; photo: string; phrase: string }[]>(Chef);
  const [article, setArticle] = useState<Articletype[]>(ArticlesDB);
  const { name } = useParams();

  useEffect(() => {
    setChef((prev: { name: string; photo: string; phrase: string }[]) => {
      return prev.filter(
        (i: { name: string; photo: string; phrase: string }) => {
          return i.name === name;
        }
      );
    });
    setArticle((prev: Articletype[]) => {
      return prev.filter((i: Articletype) => {
        return i.author === name;
      });
    });
  }, [name]);

  const renderIntroduction = () => {
    return (
      <div id="chef-porfolio-center" style={{ margin: "30px 0 40px" }}>
        <div>
          <img
            className="chef-porfolio-photo"
            src={chef[0].photo}
            alt={chef[0].name}
          />
          <div className="chef-porfolio-text">{chef[0].name}</div>
          <div id="chef-porfolio-center">
            <div className="chef-porfolio-post">Recipes: 1 | Following: 0</div>
          </div>
        </div>
        <div id="chef-porfolio-center" className="chef-porfolio-info"></div>
      </div>
    );
  };

  const renderArticle = () => {
    return (
      <div className="chef-porfolio-recipe-container">
        <div className="chef-porfolio-card">
          <Link to={`/recipes/${article[0].name}`}>
            <img
              className="dish"
              alt={article[0].name}
              src={`${article[0].url}?auto=compress&cs=tinysrgb&w=300`}
            ></img>
          </Link>
          <div>
            <Link to={`/recipes/${article[0].name}`}>
              <h2 id="center" style={{ margin: "5px 0 0 0" }}>
                {article[0].name}
              </h2>
            </Link>
            <Link to={`/recipes/${article[0].name}`}>
              <p id="center" style={{ fontWeight: "normal" }}>
                {article[0].title}
              </p>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const renderEmpty = () => {
    return (
      <div
        id="chef-porfolio-center"
        style={{ height: "350px", alignItems: "center" }}
        className="chef-porfolio-recipe"
      >
        Empty
      </div>
    );
  };

  return (
    <Container>
      {renderIntroduction()}
      <div id="chef-porfolio-center">
        <div>
          <h2 className="chef-porfolio-recipes">Recipes</h2>
          {article.length !== 0 ? renderArticle() : renderEmpty()}
        </div>
      </div>
    </Container>
  );
};

export default Person;
