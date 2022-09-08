import React from "react";

function Start(props) {
  return (
    <div className="start-screen">
      <h1 className="start-screen--title">Quizzical</h1>
      <p className="start-screen--description">
        This is a Trivia Game made with ❤ and React
      </p>
      <button className="primary-btn" onClick={props.handleClick}>
        Start quiz
      </button>
    </div>
  );
}

export default Start;
