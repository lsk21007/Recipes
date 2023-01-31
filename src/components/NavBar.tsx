import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form } from "react-bootstrap";
import NavRecipe from "../assets/NavRecipe";
import loginType from "../typings/UserToken";
import { Link } from "react-router-dom";
import fangdajing from "../assets/svg/fangdajing.svg";
import person from "../assets/svg/person.svg";
import "./NavBar.css";

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
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Navbar
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Container style={{ margin: 0 }}>
          <Link
            id="log"
            to="/"
            className="navbar-logo"
            style={{ color: "white" }}
          >
            Recipes
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="navbar-responsive-navbar-nav">
            <Nav className="navbar-nav-left">
              <Link id="navbar-log" to="/" style={{ padding: "8px" }}>
                Home
              </Link>
              <NavDropdown
                style={{ paddingLeft: "8px" }}
                title="Recipes"
                id="navbar-collasible-nav-dropdown"
              >
                <div className="navbar-small-container">
                  {recipe.map((i, index) => {
                    return (
                      <div key={index} className="navbar-container">
                        <Link
                          to={`/search/${cuisine[index]}`}
                          className="navbar-left"
                        >
                          <div style={{ fontSize: "15px", fontWeight: "bold" }}>
                            {cuisine[index]}
                          </div>
                        </Link>
                        {width > 500 && (
                          <div className="navbar-right-up">
                            {i.slice(1).map((j, jndex) => {
                              return (
                                <Link
                                  key={jndex}
                                  to={`/search/${j}`}
                                  style={{ backgroundColor: "white" }}
                                >
                                  <div className="navbar-right">{j}</div>
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
                <Link
                  to="/all"
                  style={{
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  See All
                </Link>
              </NavDropdown>
              <Link
                style={{ color: "white", padding: "8px", marginRight: "20px" }}
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
                    margin: "5px 0",
                    borderRadius: "5px 0px 0px 5px",
                  }}
                />
                {input === "" ? (
                  <Link
                    style={{
                      backgroundColor: "grey",
                      borderRadius: "0px 5px 5px 0px",
                      margin: "5px 0 5px",
                      height: "35px",
                      width: "40px",
                    }}
                    to={`/search/all`}
                  >
                    <button
                      style={{
                        backgroundColor: "grey",
                        border: "none",
                        borderRadius: "0px 5px 5px 0px",
                      }}
                    >
                      <img
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "20px",
                          height: "20px",
                        }}
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
                        style={{ width: "20px", height: "20px" }}
                        src={fangdajing}
                        alt="search"
                      />
                    </button>
                  </Link>
                )}
              </Form>
            )}
            {width > 574 && login.status !== "ok" && (
              <Nav className="navbar-login">
                <Link id="navbar-log" to="/login">
                  Sign In
                </Link>{" "}
                |
                <Link id="navbar-log" to="/register">
                  Sign Up
                </Link>
              </Nav>
            )}
            {width > 574 && login.status === "ok" && (
              <Nav className="navbar-login">
                <Link to={`/user/${login.username}`}>
                  <img
                    style={{
                      filter: "invert(1)",
                      width: "35px",
                      height: "35px",
                    }}
                    src={person}
                    alt={login.username}
                  ></img>
                </Link>
                <Link id="navbar-log" to={`/user/${login.username}`}>
                  <div style={{ marginLeft: "5px" }}>Hi, {login.username}</div>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
