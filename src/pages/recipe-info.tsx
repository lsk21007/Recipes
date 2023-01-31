import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import person from "../assets/svg/person.svg";
import { Hit } from "../typings/ApiType";
import Banner from "../components/Banner";
import Loading from "../components/Loading";
import "./recipe-info.css";

const Recipe: React.FC = () => {
  const { item } = useParams();
  const [recipe, setRecipe] = useState<any>("loading");
  const [recipes, setRecipes] = useState<any>("loading");
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<{ comment: string; time: string }[]>(
    []
  );
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    const time = new Date().toLocaleDateString();
    setComments((prev: { comment: string; time: string }[]) => [
      ...prev,
      { comment: comment, time: time },
    ]);
    setComment("");
  };

  useEffect(() => {
    const getApi = async () => {
      const data = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${item}&app_id=006d11be&app_key=aaa1a3965137ad834716ac628a6e6a31%09`
      );
      const res = await data.json();
      setRecipe(res.hits[0].recipe);
      setRecipes(res.hits.slice(0, 10));
    };
    getApi();
  }, [item]);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
  }, []);

  const renderRecipesInfo = () => {
    return recipe.ingredients.map(
      (i: { image: string; text: string }, index: number) => {
        return (
          <div key={index} className="recipe-info-step-container">
            <img
              className="recipe-info-step"
              src={i.image}
              alt={i.text}
              style={{ height: "70px" }}
            ></img>
            <div className="recipe-info-small-container">
              <h5 style={{ marginTop: "5px" }}>Step: {index + 1}</h5>
              <p>{i.text}</p>
            </div>
          </div>
        );
      }
    );
  };

  const renderCommentComponent = () => {
    return (
      <div className="recipe-info-comment-container">
        <h2 className="recipe-info-comment">Comment</h2>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <textarea
            onChange={handleChange}
            value={comment}
            placeholder="comment"
          ></textarea>
          <button onClick={handleClick} className="recipe-info-button">
            Submit
          </button>
        </div>
        {comments.map((i: { time: string; comment: string }) => {
          return (
            <div style={{ display: "flex", marginBottom: "10px" }} key={i.time}>
              <img
                style={{
                  width: "45px",
                  height: "45px",
                  marginRight: "5px",
                }}
                src={person}
                alt="person"
              ></img>
              <div>
                <div>{i.time}</div>
                <div style={{ fontWeight: "bold" }}>{i.comment}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderRightComponent = () => {
    return (
      <div className="recipe-info-sidebar">
        <h2>Related Dishes</h2>
        {recipe === "loading" ? null : (
          <div>
            {recipes.map((i: Hit, index: number) => (
              <div key={index}>
                <Link to={`/search/${i.recipe.label}`}>
                  <Button content={i.recipe.label}></Button>
                </Link>
              </div>
            ))}
          </div>
        )}
        {renderCommentComponent()}
      </div>
    );
  };

  return (
    <div>
      <Banner />
      {recipe === "loading" ? (
        <Loading />
      ) : (
        <div className="recipe-info-top">
          <div>
            <img
              className="recipe-info-img"
              src={recipe.image}
              alt={item}
            ></img>
            <h2 className="recipe-info-title">{item}</h2>
            {renderRecipesInfo()}
          </div>
          {width > 768 && renderRightComponent()}
        </div>
      )}
    </div>
  );
};

export default Recipe;
