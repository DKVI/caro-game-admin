import React, { useEffect, useRef, useState } from "react";
import utils from "../utils";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import API from "../axios/API";
import SpinnerLoading from "../components/Loading";
function AddUsersPage() {
  const { setCookie, getCookie } = utils;
  const navigate = useNavigate();
  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const token = getCookie("token");
    if (token.length === 0) {
      navigate("/login");
    }
  }, []);
  async function handleAdd() {
    if (name.length === 0) {
      nameRef.current.focus();
      setError("");
      setError("Please fill name field!");
      return;
    } else if (username.length === 0) {
      usernameRef.current.focus();
      setError("");
      setError("Please fill username field!");
      return;
    } else if (password.length === 0) {
      passwordRef.current.focus();
      setError("");
      setError("Please fill password field!");
      return;
    } else if (email.length === 0) {
      emailRef.current.focus();
      setError("");
      setError("Please fill email field!");
      return;
    }
    setError("");
    const body = {
      name,
      username,
      password,
      email,
      admin: false,
    };
    setPending(true);
    console.log(body);
    await API.createUser(body)
      .then((res) => {
        setPending(false);
        alert("Add user successfully!");
        navigate("/main");
      })
      .catch((err) => {
        setPending(false);
        alert("Have a error please try again!");
      });
  }
  return (
    <div>
      <Header />
      <div className="px-10 py-10">
        <div className=" text-[40px] font-bold"></div>
        <div className="w-full mt-10 p-10 text-left flex justify-center">
          <div className="w-[60%] border border-red-600 p-4">
            <h1>ADD NEW USER</h1>
            <div className="p-2 flex gap-3 items-center">
              <label>NAME: </label>{" "}
              <input
                ref={nameRef}
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="flex-1 p-2 border border-black"
              />
            </div>
            <div className="p-2 flex gap-3">
              <label>USERNAME: </label>{" "}
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ref={usernameRef}
                className="flex-1 p-2 border border-black"
              />
            </div>
            <div className="p-2 flex gap-3">
              <label>PASSWORD: </label>{" "}
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
                className="flex-1 p-2 border border-black"
              />
            </div>
            <div className="p-2 flex gap-3">
              <label>EMAIL: </label>{" "}
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                ref={emailRef}
                className="flex-1 p-2 border border-black"
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div className="flex gap-4 mt-2">
              <button
                className="w-1/2 p-2 bg-blue-600 rounded-lg text-white"
                onClick={() => {
                  navigate("/main");
                }}
              >
                Back
              </button>
              <button
                className="w-1/2 p-2 bg-red-600 rounded-lg text-white"
                onClick={handleAdd}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      {pending && <SpinnerLoading />}
    </div>
  );
}

export default AddUsersPage;
