import React, { useEffect, useState } from "react";
import utils from "../utils";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Table from "react-bootstrap/Table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import API from "../axios/API/index";
import EditForm from "../components/EditForm";
import SpinnerLoading from "../components/Loading";
import ConfirmationDialog from "../components/ConfirmDialog";

function MainPage() {
  const { setCookie, getCookie } = utils;
  const { formatDate, formatTime } = utils;
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("info");
  const searchParams = new URLSearchParams(location.search);
  const idParam = searchParams.get("id");
  const [showDialog, SetShowDialog] = useState(false);
  const [pending, setPending] = useState(false);
  const handleDelete = async (id) => {
    setPending(true);
    await API.deleteGameByUserId(id)
      .then((res) => {
        API.deleteUserById(id)
          .then((res) => {
            alert(`Delete user ${id} successfully!`);
            setPending(false);
            navigate("/main");
          })
          .catch((err) => {
            alert("Server error! Please try again");
            setPending(false);
          });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const token = getCookie("token");
    if (token.length === 0) {
      navigate("/login");
    }
    API.getUserById(idParam)
      .then((res) => {
        console.log(res);
        setUser(res.data.user[0]);
      })
      .catch((err) => console.log(err));
    API.getHistoryGameById(idParam)
      .then((res) => {
        console.log(res);
        setHistory(res.data.games);
      })
      .catch((err) => {
        setHistory(null);
      });
  }, []);
  useEffect(() => {
    console.log(history);
  }, [history]);
  return (
    <div>
      <Header />
      <div className="px-10 py-10">
        <div className=" text-[40px] font-bold">USER {user && user.ID}</div>
        {mode === "info" ? (
          <>
            <div className="users-container py-10">
              <div className="px-10">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th colSpan={4} className="text-[24px]">
                        INFO
                      </th>
                    </tr>
                  </thead>
                  {user ? (
                    <tbody>
                      <tr>
                        <td colSpan={1}>NAME</td>
                        <td colSpan={3}>{user.NAME}</td>
                      </tr>
                      <tr>
                        <td colSpan={1}>USERNAME</td>
                        <td colSpan={3}>{user.USERNAME}</td>
                      </tr>
                      <tr>
                        <td colSpan={1}>PASSWORD</td>
                        <td colSpan={3}>{user.PASSWORD}</td>
                      </tr>
                      <tr>
                        <td colSpan={1}>EMAIL</td>
                        <td colSpan={3}>{user.EMAIL}</td>
                      </tr>
                      <tr>
                        <td colSpan={1}>SCORE</td>
                        <td colSpan={3}>{user.SCORE}</td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan={1}>
                          <Skeleton />
                        </td>
                        <td colSpan={3}>
                          {" "}
                          <Skeleton />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={1}>
                          {" "}
                          <Skeleton />
                        </td>
                        <td colSpan={3}>
                          <Skeleton />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={1}>
                          {" "}
                          <Skeleton />
                        </td>
                        <td colSpan={3}>
                          {" "}
                          <Skeleton />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={1}>
                          {" "}
                          <Skeleton />
                        </td>
                        <td colSpan={3}>
                          {" "}
                          <Skeleton />
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </div>
              <div className="px-10 mt-10">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th colSpan={7} className="text-[24px]">
                        ALL USER'S GAMES
                      </th>
                    </tr>
                  </thead>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>OPPONENT_NAME</th>
                      <th>MODE</th>
                      <th>SCORE</th>
                      <th>PLAY_TIME</th>
                      <th>START_TIME</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  {history ? (
                    <tbody>
                      {Array.from(history).map((item, index) => {
                        return (
                          <tr>
                            <textarea className="w-full h-full">
                              {item.ID}
                            </textarea>
                            <td>{item.OPPONENT_NAME}</td>
                            <td>
                              {item.OPPONENT_NAME === "CPU"
                                ? "CPU"
                                : "WITH PLAYER 2"}
                            </td>
                            <td>{item.SCORE}</td>
                            <td>{formatTime(item.PLAY_TIME)}</td>
                            <td>{formatDate(item.START_TIME)}</td>
                            <td>{item.STATUS}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                        <td>
                          <Skeleton />
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              </div>
            </div>
            <div className="flex gap-4 px-5 justify-between">
              <div
                className="w-1/2 p-2 bg-blue-500 cursor-pointer rounded-3xl text-white hover:opacity-70"
                onClick={() => {
                  setMode("edit");
                }}
              >
                EDIT USER
              </div>
              <div
                className="w-1/2 p-2 bg-red-500 cursor-pointer rounded-3xl text-white hover:opacity-70"
                onClick={() => {
                  SetShowDialog(true);
                }}
              >
                DELETE USER
              </div>
            </div>
          </>
        ) : (
          <EditForm
            user={user}
            callback={() => {
              setMode("info");
            }}
          />
        )}
        {showDialog && (
          <ConfirmationDialog
            isOpen={showDialog}
            message={`Do you want to delete user ${user.ID} (${user.USERNAME})`}
            onConfirm={() => {
              handleDelete(user.ID);
            }}
            onCancel={() => SetShowDialog(false)}
          />
        )}
      </div>
      {pending && <SpinnerLoading />}
    </div>
  );
}

export default MainPage;
