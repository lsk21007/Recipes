import React, { useEffect, useReducer, useState } from "react";
import { Container } from "react-bootstrap";
import BACK from "../assets/svg/BACK.svg";
import DELETE from "../assets/svg/DELETE.svg";
import CLICK from "../assets/svg/CLICK.svg";
import loginType from "../typings/UserToken";
import Banner from "../components/Banner";
import axios from "axios";
import "./tobuylist.css";

interface listType {
  todolist: { todo: string; id: string }[];
  todolist2: { todo: string; id: string }[];
  modelOpen: boolean;
  content: string;
}

interface props {
  login: loginType;
  setLogin: React.Dispatch<React.SetStateAction<loginType>>;
}

const list: listType = {
  todolist: [],
  todolist2: [],
  modelOpen: false,
  content: "",
};

const BUTTONS = ["TODO", "DONE", "ALL"];

const reducer = (
  state: listType,
  action: { type: string; id?: string; info?: { todo: string; id: string } }
): any => {
  switch (action.type) {
    case "ADD":
      return {
        todolist: [...state.todolist, action.info],
        todolist2: state.todolist2,
        modelOpen: true,
        content: "* Add item successfully",
      };
    case "EMPTY":
      return {
        todolist: state.todolist,
        todolist2: state.todolist2,
        modelOpen: true,
        content: "* The input box is empty",
      };
    case "CLOSE":
      return {
        todolist: state.todolist,
        todolist2: state.todolist2,
        modelOpen: false,
        content: "* The input box is empty",
      };
    case "FINISH":
      const removeItem = state.todolist.filter(
        (i: { todo: string; id: string }) => {
          return i.id !== action.id;
        }
      );
      const addItem = state.todolist.find((i: { todo: string; id: string }) => {
        return i.id === action.id;
      });
      return {
        todolist: removeItem,
        todolist2: [...state.todolist2, addItem],
        modelOpen: true,
        content: "* Gotcha",
      };
    case "BACK":
      const removeItem2 = state.todolist2.filter(
        (i: { todo: string; id: string }) => {
          return i.id !== action.id;
        }
      );
      const addItem2 = state.todolist2.find(
        (i: { todo: string; id: string }) => {
          return i.id === action.id;
        }
      );
      return {
        todolist: [...state.todolist, addItem2],
        todolist2: removeItem2,
        modelOpen: true,
        content: "* Gotcha",
      };
    case "DELETE":
      const delete1 = state.todolist.filter(
        (i: { todo: string; id: string }) => {
          return i.id !== action.id;
        }
      );
      const delete2 = state.todolist2.filter(
        (i: { todo: string; id: string }) => {
          return i.id !== action.id;
        }
      );
      return {
        todolist: delete1,
        todolist2: delete2,
        modelOpen: true,
        content: "* Delete item successfully",
      };
  }
};

const Tobuylist: React.FC<props> = ({ login, setLogin }) => {
  const [input, setInput] = useState<string>("");
  const [open, setOpen] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, list);

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      const id = new Date().getTime().toString();
      const info = { todo: input, id: id };
      dispatch({ type: "ADD", info: info });
    } else {
      dispatch({ type: "EMPTY" });
    }
    setInput("");
  };

  useEffect(() => {
    const turnOn = async () => {
      state.todolist = await login.TODO;
      state.todolist2 = await login.DONE;
    };
    turnOn();
  }, []);

  useEffect(() => {
    if (
      login.username !== "" &&
      (state.todolist.length !== 0 || state.todolist2.length !== 0)
    ) {
      axios
        .post("http://localhost:8080/tobuylist", {
          TODO: state.todolist,
          DONE: state.todolist2,
          email: login.username,
        })
        .then((res) =>
          setLogin((prev) => {
            return { ...prev, TODO: res.data.TODO, DONE: res.data.DONE };
          })
        );
    }
  }, [state, login.username, setLogin]);

  useEffect(() => {
    if (state?.modelOpen) {
      setTimeout(() => {
        dispatch({ type: "CLOSE" });
      }, 1000);
    }
  }, [state?.modelOpen]);

  const selectList = () => {
    switch (open) {
      case 0:
        return selectTodo();
      case 1:
        return selectDone();
      case 2:
        return <>{selectTodo() || selectDone()}</>;
      default:
        break;
    }
  };

  const selectTodo = () => {
    return (
      <div>
        {state?.todolist.map(
          (i: { todo: string; id: string }, index: number) => {
            return (
              <div key={index}>
                <hr style={{ margin: "0 0 5px 0" }}></hr>
                <div
                  id="tobuylist-center"
                  style={{
                    position: "relative",
                    paddingBottom: "5px",
                    justifyContent: "left",
                  }}
                >
                  <img
                    onClick={() => {
                      dispatch({ type: "FINISH", id: i.id });
                    }}
                    className="tobuylist-img"
                    style={{ marginLeft: "2%" }}
                    id="box"
                    src={CLICK}
                    alt="click"
                  ></img>
                  <h4
                    className="tobuylist-h4"
                    style={{ marginLeft: "2%" }}
                    id="box"
                  >
                    {i.todo}
                  </h4>
                  <img
                    onClick={() => {
                      dispatch({ type: "DELETE", id: i.id });
                    }}
                    className="tobuylist-img"
                    style={{ right: "2%", position: "absolute" }}
                    id="tobuylist-box"
                    src={DELETE}
                    alt="delete"
                  ></img>
                </div>
              </div>
            );
          }
        )}
      </div>
    );
  };

  const selectDone = () => {
    return (
      <div>
        {state?.todolist2.map(
          (i: { todo: string; id: string }, index: number) => {
            return (
              <div key={index}>
                <hr style={{ margin: "0 0 5px 0" }}></hr>
                <div
                  id="tobuylist-center"
                  style={{
                    position: "relative",
                    paddingBottom: "5px",
                    justifyContent: "left",
                  }}
                >
                  <img
                    onClick={() => {
                      dispatch({ type: "BACK", id: i.id });
                    }}
                    className="tobuylist-img"
                    style={{ marginLeft: "2%" }}
                    id="box"
                    src={BACK}
                    alt="back"
                  ></img>
                  <h4
                    style={{
                      marginLeft: "2%",
                      textDecoration: "line-through",
                    }}
                    id="box"
                  >
                    {i.todo}
                  </h4>
                  <img
                    onClick={() => {
                      dispatch({ type: "DELETE", id: i.id });
                    }}
                    className="tobuylist-img"
                    style={{ right: "2%", position: "absolute" }}
                    id="box"
                    src={DELETE}
                    alt="delete"
                  ></img>
                </div>
              </div>
            );
          }
        )}
      </div>
    );
  };

  return (
    <>
      <Banner />
      <Container style={{ height: "770px" }}>
        <div
          id="tobuylist-center"
          style={{ margin: "40px 20px", backgroundColor: "#F1F1F1" }}
        >
          <div className="tobuylist-area">
            <div id="tobuylist-center">
              <h2 style={{ fontWeight: "bold" }}>ToBuyList</h2>
            </div>
            {login.status === "none" && (
              <div id="tobuylist-center">
                <p className="tobuylist-paragrah">
                  Login to save your to buy list.
                </p>
              </div>
            )}
            <div id="center">
              <input
                className="tobuylist-input"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              ></input>
              <button
                className="tobuylist-button"
                onClick={handleClick}
                style={{ marginRight: "10px" }}
              >
                Submit
              </button>
            </div>
            <div id="tobuylist-center">
              {state?.modelOpen && <p>{state?.content}</p>}
            </div>
          </div>
        </div>
        <div style={{ margin: "40px 20px", backgroundColor: "#F1F1F1" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginRight: "2%",
            }}
          >
            {BUTTONS.map((btn, index) => {
              return (
                <button
                  onClick={() => setOpen(index)}
                  name={index.toString()}
                  className="tobuylist-nav"
                  style={{
                    backgroundColor: index === open ? "grey" : "#F1F1F1",
                  }}
                >
                  {btn}
                </button>
              );
            })}
          </div>
          {selectList()}
        </div>
      </Container>
    </>
  );
};

export default Tobuylist;
