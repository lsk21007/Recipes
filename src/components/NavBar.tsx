import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form } from "react-bootstrap";
import styled from "styled-components";
import NavRecipe from "../assets/NavRecipe";
import loginType from "../typings/UserToken";
import { Link } from "react-router-dom";
import fangdajing from "../assets/svg/fangdajing.svg";
import person from "../assets/svg/person.svg";

const Wrapper = styled.div`
  * {
    font-weight: bold;
    font-size: 20px;
  }
  .logo {
    font-size: 40px;
    font-weight: bold;
  }
  #item {
    margin-right: 10px;
  }
  .container {
    display: flex;
  }
  #responsive-navbar-nav {
    justify-content: center;
  }
  .right {
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    font-weight: normal;
    color: black;
  }
  input:focus::-webkit-input-placeholder {
    opacity: 0;
  }
  input:focus::-moz-placeholder {
    opacity: 0;
  }

  input:focus:-ms-input-placeholder {
    opacity: 0;
  }

  input:focus:-moz-placeholder {
    opacity: 0;
  }
  a {
    text-decoration: none;
  }
  .left {
    display: flex;
    width: 150px;
    align-items: center;
    justify-content: center;
    color: black;
    background-color: white;
  }
  #log {
    padding: 0 10px 0 10px;
    color: #a1a1a1;
  }
  #log:hover {
    color: #b3b3b3;
  }
  .left a {
    color: black;
  }
  .right-up {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin-right: 30px;
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .login {
    position: relative;
    left: 200px;
    color: grey;
    align-items: center;
  }
  @media screen and (max-width: 1300px) {
    .login {
      left: 60px;
    }
  }
  @media screen and (max-width: 500px) {
    .small-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

interface props {
  login: loginType;
}

const NavBar: React.FC<props> = ({ login }) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [input, setInput] = useState<string>("");
  const recipe: string[][] = Object.values(NavRecipe);
  const cuisine: string[] = [
    "Canadian Food",
    "Japanese Food",
    "Chinese Food",
    "Vegan Food",
  ];

  const getWidth = (): void => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("resize", getWidth);
  }, []);

  return (
    <Wrapper style={{ position: "sticky", top: 0, zIndex: 1 }}>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link id="log" to="/" className="logo" style={{ color: "white" }}>
            Recipes
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-left">
              <Link id="log" to="/" style={{ padding: "8px" }}>
                Home
              </Link>
              <NavDropdown
                style={{ paddingLeft: "8px" }}
                title="Recipes"
                id="collasible-nav-dropdown"
              >
                <div className="small-container">
                  {recipe.map((i, index) => {
                    return (
                      <div key={index} className="container">
                        <NavDropdown.Item className="left">
                          <Link to={`/search/${cuisine[index]}`}>
                            <div style={{ fontSize: "15px" }}>
                              {cuisine[index]}
                            </div>
                          </Link>
                        </NavDropdown.Item>
                        {width > 500 && (
                          <div className="right-up">
                            {i.slice(1).map((j, jndex) => {
                              return (
                                <Link key={jndex} to={`/recipes/${j}`}>
                                  <NavDropdown.Item
                                    style={{ backgroundColor: "white" }}
                                  >
                                    <div className="right">{j}</div>
                                  </NavDropdown.Item>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {width > 500 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <hr style={{ width: "600px" }}></hr>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <hr style={{ width: "300px" }}></hr>
                  </div>
                )}
                <NavDropdown.Item style={{ backgroundColor: "white" }}>
                  <Link
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "15px",
                    }}
                    to="/all"
                  >
                    See All
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
              <Link
                style={{ color: "white", padding: "8px" }}
                id="item"
                to="/tobuylist"
              >
                ToBuyList
              </Link>
            </Nav>
            {width > 574 && (
              <Form className="d-flex">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  placeholder=" Enter dish name"
                  value={input}
                  style={{
                    height: "35px",
                    border: "white",
                    outline: "none",
                    paddingLeft: "5px",
                    marginRight: "0",
                    borderRadius: "5px 0px 0px 5px",
                  }}
                />
                {input === "" ? (
                  <Link
                    style={{
                      backgroundColor: "grey",
                      borderRadius: "0px 5px 5px 0px",
                    }}
                    to={`/search/all`}
                  >
                    <button
                      style={{
                        backgroundColor: "grey",
                        border: "none",
                        width: "40px",
                        borderRadius: "0px 5px 5px 0px",
                      }}
                    >
                      <img
                        style={{ width: "20px", height: "20px" }}
                        src={fangdajing}
                        alt="search"
                      />
                    </button>
                  </Link>
                ) : (
                  <Link
                    style={{
                      backgroundColor: "grey",
                      borderRadius: "0px 5px 5px 0px",
                    }}
                    to={`/search/${input}`}
                  >
                    <button
                      onClick={() => setInput("")}
                      style={{
                        backgroundColor: "grey",
                        border: "none",
                        width: "40px",
                        borderRadius: "0px 5px 5px 0px",
                      }}
                    >
                      <img
                        style={{ width: "20px", height : "20px" }}
                        src={fangdajing}
                        alt="search"
                      />
                    </button>
                  </Link>
                )}
              </Form>
            )}
            {width > 574 && login.status !== "ok" && (
              <Nav className="login">
                <Link id="log" to="/login">
                  Sign In
                </Link>{" "}
                |
                <Link id="log" to="/register">
                  Sign Up
                </Link>
              </Nav>
            )}
            {width > 574 && login.status === "ok" && (
              <Nav className="login">
                <Link to={`/user/${login.username}`}>
                  <img
                    style={{ filter: "invert(1)", width: "35px" }}
                    src={person}
                    alt={login.username}
                  ></img>
                </Link>
                <Link id="log" to={`/user/${login.username}`}>
                  <div style={{ marginLeft: "5px" }}>Hi, {login.username}</div>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Wrapper>
  );
};

export default NavBar;
