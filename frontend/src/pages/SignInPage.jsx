import React, { useContext, useEffect, useState } from "react";
import boardContext from "../contexts/BoardContext";
import "../styles/SignInPage.scss";
import { fetchHandler, getPostOptions } from "../utils";
import { getFromLocalStorage, setLocalStorage } from "../localStorage";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const { setJwt, jwt, setUserId } = useContext(boardContext);
  const [loggingIn, setLoggingIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") || jwt) {
      console.log(getFromLocalStorage("token"));
      console.log(jwt);
      navigate("/");
    }
  }, []);

  const clearFields = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearFields();
    const data = { email, password };
    if (loggingIn) {
      const [res, err] = await fetchHandler(
        "/api/users/login",
        getPostOptions(data)
      );
      if (err) {
        console.log(err);
        setError(err.message);
        return;
      }
      sessionStorage.setItem("token", res.token);
      setJwt(res.token);
      setUserId(res.userId);
      navigate("/game");
    } else {
      data.displayName = displayName;
      const [res, err] = await fetchHandler(
        "/api/users/register",
        getPostOptions(data)
      );
      if (err) {
        setError(err.message);
        return;
      }
      sessionStorage.setItem("token", res.token);
      setJwt(res.token);
      setUserId(res.userId);
      navigate("/game");
    }
  };

  const signUpButton = (e) => {
    e.preventDefault();
    setLoggingIn(false);
  };

  const logInButton = (e) => {
    e.preventDefault();
    setLoggingIn(true);
  };

  useEffect(() => {
    clearFields();
  }, [loggingIn]);

  return (
    <>
      <div id="swapButtons">
        <button onClick={signUpButton}>Sign Up</button>
        <button onClick={logInButton}>Log In</button>
      </div>
      <div id="form-wrapper">
        <form
          className={loggingIn ? "logIn" : "signUp"}
          onSubmit={handleSubmit}
        >
          {!loggingIn && (
            <input
              type="text"
              placeholder="DisplayName..."
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
              required={true}
            />
          )}
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />
          <button>Submit</button>
        </form>
      </div>
      {error && <div id="error-message">{error}</div>}
    </>
  );
};

export default SignInPage;
