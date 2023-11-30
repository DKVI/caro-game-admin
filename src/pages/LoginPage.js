import React, { useRef, useState } from "react";
import API from "../axios/API";
import utils from "../utils/index";
import { useNavigate } from "react-router-dom";
import SpinnerLoading from "../components/Loading";
import { useDispatch } from "react-redux";
import action from "../redux/action";
function LoginPage() {
  const { setCookie } = utils;
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = async () => {
    if (username === "" && password === "") {
      setError("Please enter both username and password!");
      return;
    } else if (username === "") {
      usernameRef.current.focus();
      setError("Please enter username!");
      return;
    } else if (password === "") {
      passwordRef.current.focus();
      setError("Please enter password!");
      return;
    }
    setPending(true);
    await API.login({ username, password })
      .then((res) => {
        setTimeout(() => {
          alert("Login successfully! Welcome back admin");
          setPending(false);
          setCookie("token", res.data.token, 3600);
          dispatch(action.setAdmin({ username, password }));
          navigate("/main");
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          alert("username or password is incorrect! Please try again");
          setPending(false);
          usernameRef.current.value = "";
          setUsername("");
          passwordRef.current.value = "";
          setPassword("");
          setPending(false);
        }, 1000);
      });
    return;
  };

  return (
    <div className="flex h-screen w-screen">
      <div
        className="m-auto w-[500px] text-left p-4 rounded-2xl"
        style={{ boxShadow: "0px 3px 3px 3px #cccc" }}
      >
        <div className="login-container flex flex-col gap-4">
          <h2 className="text-center">WELCOME BACK!</h2>
          <div className="flex-col flex gap-4">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                ref={usernameRef}
                type="text"
                className="form-control mt-2"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setError(null);
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                ref={passwordRef}
                type="password"
                className="form-control mt-2"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setError(null);
                  setPassword(e.target.value);
                }}
              />
            </div>
            {error && (
              <div className="error-message text-[14px] text-red-600">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-login mt-2"
              onClick={handleFormSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      {pending && <SpinnerLoading full={true} />}
    </div>
  );
}

export default LoginPage;
