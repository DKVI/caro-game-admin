import React, { useEffect, useRef, useState } from "react";
import utils from "../utils";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import API from "../axios/API";
import SpinnerLoading from "../components/Loading";
function AdminPage() {
  const { setCookie, getCookie } = utils;
  const navigate = useNavigate();
  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const [mode, setMode] = useState("changePassword");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const token = getCookie("token");
    if (token.length === 0) {
      navigate("/login");
    }
  }, []);
  async function handleAdd() {
    if (username.length === 0) {
      usernameRef.current.focus();
      setError("");
      setError("Please fill username field!");
    } else if (password.length === 0) {
      passwordRef.current.focus();
      setError("");
      setError("Please fill password field!");
      return;
    }
    setPending(true);
    const body = { username, password };
    API.login(body)
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        console.log(token);
        API.changePassword(newPassword, token).then((res) => {
          alert("Change password successfully!");
          setPending(false);
          const currentDate = new Date();
          const expirationDate = new Date(currentDate.getTime());

          document.cookie = `token=myTokenValue; expires=${expirationDate.toUTCString()}; path=/`;
          navigate("/login");
        });
      })
      .catch((err) => {
        console.log(err);
        setPending(false);
        alert("Have some error! Please try again!");
      });
  }
  return (
    <div>
      <Header />
      <div className="px-10 py-10">
        <div className="w-full mt-10 p-10 text-left flex justify-center">
          <div className="w-[60%] border border-red-600 p-4">
            {mode === "changePassword" ? (
              <>
                {" "}
                <h1>CHANGE PASSWORD FOR ADMIN</h1>
                <div className="p-2 flex gap-3 items-center">
                  <label>USERNAME: </label>{" "}
                  <div className="flex-1 p-2">admin</div>
                </div>
                <div className="p-2 flex gap-3 items-center">
                  <label>PASSWORD: </label>{" "}
                  <input
                    ref={newPasswordRef}
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError("");
                    }}
                    className="flex-1 p-2 border border-black"
                  />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <div className="flex gap-4 mt-2">
                  <button
                    className="w-1/2 p-2 bg-red-600 rounded-lg text-white"
                    onClick={() => {
                      navigate("/main");
                    }}
                  >
                    BACK
                  </button>
                  <button
                    className="w-1/2 p-2 bg-blue-600 rounded-lg text-white"
                    onClick={() => {
                      if (newPassword.length === 0) {
                        setError("");
                        setError("Please fill new password field!");
                        return;
                      }
                      setMode("confirmPassword");
                    }}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1>RE-LOGIN TO SAVE CHANGE</h1>
                <div className="p-2 flex gap-3">
                  <label>USERNAME: </label>{" "}
                  <input
                    ref={usernameRef}
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError("");
                    }}
                    className="flex-1 p-2 border border-black"
                  />
                </div>
                <div className="p-2 flex gap-3">
                  <label>PASSWORD: </label>{" "}
                  <input
                    ref={passwordRef}
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="flex-1 p-2 border border-black"
                  />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <div className="flex gap-4 mt-2">
                  <button
                    className="w-1/2 p-2 bg-red-600 rounded-lg text-white"
                    onClick={() => {
                      setMode("changePassword");
                      setError("");
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="w-1/2 p-2 bg-blue-600 rounded-lg text-white"
                    onClick={handleAdd}
                  >
                    Verify
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {pending && <SpinnerLoading />}
    </div>
  );
}

export default AdminPage;
