import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";
function Auth({ authRoute }) {
  let body = (
    <>
      Learn It
      {authRoute === "login" && <Login />}
      {authRoute === "register" && <Register />}
    </>
  );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1> Learn It </h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;
