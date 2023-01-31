import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import loginType from "../typings/UserToken";
import Loading from "../components/Loading";
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

  const renderInputFields = () => {
    return (
      <>
        <input
          className="register-input"
          onChange={handleChange}
          type="text"
          value={user.email}
          name="email"
          placeholder="Email*"
        ></input>
        <br />
        <input
          className="register-input"
          onChange={handleChange}
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
      <button onClick={handleClick} className="register-button">
        <div className="register-text">SIGN UP</div>
      </button>
    ) : (
      <button disabled className="register-button-disable">
        <div className="register-text-disable">SIGN UP</div>
      </button>
    );
  };

  const renderRegister = () => {
    return (
      <div
        className="register-container"
        style={{ height: height + "px", opacity: isLoading ? 0.5 : 1 }}
      >
        <div>
          <h2 style={{ fontWeight: "bold", marginLeft: "10px" }}>Register</h2>
          <p style={{ marginLeft: "10px" }}>Click button to be a chef !</p>
          {renderInputFields()}
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
            {renderButton()}
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
    );
  };

  return (
    <div>
      {isLoading && <Loading />}
      {renderRegister()}
    </div>
  );
};

export default Register;
