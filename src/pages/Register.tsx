import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import loginType from "../typings/UserToken";
import "./register.css";

interface props {
  login: loginType;
  setLogin: React.Dispatch<React.SetStateAction<loginType>>;
}

const Register: React.FC<props> = ({ login, setLogin }) => {
  const navigate = useNavigate();
  const [height, setHeight] = useState<string>(
    (window.innerHeight * 0.8).toString()
  );
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState<boolean>(false);
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
      .post("https://recipes-server.onrender.com/register", user)
      .then((res) => setLogin(res.data));
    setUser({ email: "", password: "" });
  };

  useEffect(() => {
    if (login.status === "ok") {
      login && navigate("/");
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [login]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setHeight((window.innerHeight * 0.8).toString())
    );
    return window.removeEventListener("resize", () =>
      setHeight((window.innerHeight * 0.8).toString())
    );
  }, []);

  useEffect(() => {
    if (user.email !== "" && user.password !== "") {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [user]);

  return (
    <div>
      {isLoading && (
        <div className="login-isLoading">
          <img
            style={{ width: "440px", height: "220px", objectFit: "cover" }}
            src="https://www.gurujitips.in/wp-content/uploads/2017/06/reduce-bounce-rate-loading-gif.gif"
            alt="loading"
          ></img>
        </div>
      )}
      <div
        className="login-container"
        style={{ height: height + "px", opacity: isLoading ? 0.5 : 1 }}
      >
        <div>
          <h2 style={{ fontWeight: "bold", marginLeft: "10px" }}>Register</h2>
          <p style={{ marginLeft: "10px" }}>Click button to be a chef !</p>
          <div>
            <input
              style={{ display: "flex", justifyContent: "center" }}
              className="register-input"
              onChange={handleChange}
              type="text"
              value={user.email}
              name="email"
              placeholder="Email*"
            ></input>
          </div>
          <input
            style={{ display: "flex", justifyContent: "center" }}
            className="register-input"
            onChange={handleChange}
            type="password"
            value={user.password}
            name="password"
            placeholder="Password*"
          ></input>
          {login.status === "exist" && (
            <p style={{ color: "red" }}>Email exist, try to use another one.</p>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px 0",
            }}
          >
            {submit ? (
              <button onClick={handleClick} className="register-button">
                <div className="register-text">SIGN UP</div>
              </button>
            ) : (
              <button disabled className="register-button-disable">
                <div className="register-text-disable">SIGN UP</div>
              </button>
            )}
          </div>
          <hr style={{ margin: "20px" }}></hr>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              Already have an account ?&emsp; &ensp;|&ensp;&emsp;
              <Link to="/login">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
