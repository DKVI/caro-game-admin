import React, { useRef } from "react";
import { useEffect } from "react";
import API from "../axios/API";
import { useState } from "react";
import SpinnerLoading from "./Loading";
const EditForm = (props) => {
  const user = props.user;
  const callback = props.callback;
  const inputRef = useRef();
  const [pending, setPending] = useState(false);
  const [name, setName] = useState(user.NAME);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const changeName = async () => {
    console.log(name);
    if (name.length === 0) {
      alert("Please enter user name!");
    } else {
      setPending(true);
      API.changeName(user.ID, { name })
        .then((res) => {
          alert("Update user's name successfully!");
          setPending(false);
          window.location.reload();
        })
        .catch((err) => {
          alert("Have some error, please try again!");
          setPending(false);
        });
    }
  };
  return (
    <div className="w-full mt-10 p-10 text-left flex justify-center">
      <div className="w-[60%] border border-red-600 p-4">
        <div className="p-2 flex gap-3 items-center">
          <label>NAME: </label>{" "}
          <input
            ref={inputRef}
            className="flex-1 p-2 border border-black"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="p-2 flex gap-3">
          <label>USERNAME: </label>
          <div>{user.USERNAME}</div>
        </div>
        <div className="p-2 flex gap-3 items-center">
          <label>PASSWORD: </label>{" "}
          <div className="flex-1 p-2">{user.PASSWORD}</div>
        </div>
        <div className="p-2 flex gap-3">
          <label>EMAIL: </label> <div>{user.EMAIL}</div>
        </div>
        <div className="flex gap-4 mt-2">
          <button
            className="w-1/2 p-2 bg-blue-600 rounded-lg text-white"
            onClick={() => {
              callback();
            }}
          >
            Back
          </button>
          <button
            className="w-1/2 p-2 bg-red-600 rounded-lg text-white"
            onClick={() => {
              changeName();
            }}
          >
            Save
          </button>
        </div>
      </div>
      {pending && <SpinnerLoading />}
    </div>
  );
};

export default EditForm;
