import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginType from "../typings/UserToken";
import Loading from "../components/Loading";
import "./login.css";

interface props {
  login: loginType;
  setLogin: React.Dispatch<React.SetStateAction<loginType>>;
}

const LogIn: React.FC<props> = ({ login, setLogin }) => {
  const navigate = useNavigate();
  const [height, setHeight] = useState<string>(
    (window.innerHeight * 0.8).toString()
  );
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState<boolean | string>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => {
      return { ...prev, status: "none" };
    });
    setUser((prev: { email: string; password: string }) => {
      return { ...prev, [name]: value };
    });
  };
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("https://recipes-server.onrender.com/login", user)
      .then((res) => setLogin(res.data));
    setUser({ email: "", password: "" });
  };

  useEffect(() => {
    if (login.status === "ok") {
      setIsLoading(false);
      login && navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [login, navigate]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setHeight((window.innerHeight * 0.8).toString())
    );
    return window.removeEventListener("resize", () =>
      setHeight((window.innerHeight * 0.8).toString())
    );
  }, [height]);

  useEffect(() => {
    if (user.email !== "" && user.password !== "") {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [user]);

  const renderInputFields = () => {
    return (
      <>
        <input
          onChange={handleChange}
          className="login-input"
          type="text"
          value={user.email}
          name="email"
          placeholder="Email*"
        ></input>
        <br />
        <input
          onChange={handleChange}
          className="login-input"
          type="password"
          value={user.password}
          name="password"
          placeholder="Password*"
        ></input>
      </>
    );
  };

  const renderButton = () => {
    return submit ? (
      <button onClick={handleClick} className="login-button">
        <div className="login-text">SIGN IN</div>
      </button>
    ) : (
      <button disabled className="login-button-disable">
        <div className="login-text-disable">SIGN IN</div>
      </button>
    );
  };

  const renderLogin = () => {
    return (
      <div
        className="login-container"
        style={{ height: height + "px", opacity: isLoading ? 0.5 : 1 }}
      >
        <div>
          <h2 style={{ fontWeight: "bold", marginLeft: "10px" }}>Log In</h2>
          <p style={{ marginLeft: "10px" }}>
            Other chefs are waiting for you !
          </p>
          {renderInputFields()}
          {login.status === "error" && (
            <p style={{ color: "red", marginLeft: "10px" }}>
              Email or password incorrect.
            </p>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            {renderButton()}
          </div>
          <hr style={{ margin: "20px" }}></hr>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              No account yet?&emsp; &emsp;|&emsp;&emsp;
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isLoading && <Loading />}
      {renderLogin()}
    </div>
  );
};

export default LogIn;
