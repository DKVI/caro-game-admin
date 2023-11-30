import React, { useEffect, useState } from "react";
import utils from "../utils";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Table from "react-bootstrap/Table";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import API from "../axios/API/index";
function MainPage() {
  const { getAllUsers, updateAllScore } = API;
  const { setCookie, getCookie } = utils;
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");
    if (token.length === 0) {
      navigate("/login");
    }
    updateAllScore()
      .then(() => {
        getAllUsers().then((res) => {
          setAllUsers(res.data.users);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);
  return (
    <div>
      <Header />
      <div className="px-10 py-10">
        <div className=" text-[40px] font-bold">DASHBOARD</div>
        <div className="users-container py-10">
          <div className="px-10">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Scores</th>
                </tr>
              </thead>
              {allUsers && allUsers.length !== 0 ? (
                <tbody>
                  {Array.from(allUsers).map((item, index) => {
                    return (
                      <tr
                        key={item.ID}
                        onClick={() => {
                          navigate(`/users?id=${item.ID}`);
                        }}
                        className="cursor-pointer"
                      >
                        <td>{index + 1}</td>
                        <td>{item.ID}</td>
                        <td>{item.USERNAME}</td>
                        <td>{item.SCORE}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td>
                      <Skeleton className="w-full h-full" />
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
                      <Skeleton className="w-full h-full" />
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
                      <Skeleton className="w-full h-full" />
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
                  </tr>
                </tbody>
              )}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
