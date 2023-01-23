import React from "react";
import "./Button.css"

interface prop {
  content: string;
}

const Button: React.FC<prop> = ({ content }) => {
  return (
    <button className="global-btn">
      <div className="btn-text">{content}</div>
    </button>
  );
};

export default Button;
