import "./Loading.css"
const Loading = () => {
  return (
    <div className="isLoading">
      <img
        style={{ width: "440px", height: "220px", objectFit: "cover" }}
        src="https://www.gurujitips.in/wp-content/uploads/2017/06/reduce-bounce-rate-loading-gif.gif"
        alt="loading"
      ></img>
    </div>
  );
};

export default Loading;
