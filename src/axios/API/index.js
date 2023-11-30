import instance from "../index";
import untils from "../../utils/index";
const { getCookie } = untils;
const API = {
  login: (body) => {
    return new Promise(async (resolve, reject) => {
      await instance
        .post("/auth/admin", body)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  updateAllScore: async () => {
    return new Promise(async (resolve, reject) => {
      await instance
        .put("/user/updateAll")
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  getAllUsers: async () => {
    return new Promise(async (resolve, reject) => {
      await instance
        .get("/user")
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },

  getUserById: async (id) => {
    return new Promise(async (resolve, reject) => {
      await instance
        .get(`/user/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
  getHistoryGameById: async (id) => {
    console.log("getHistoryGameById");
    return new Promise(async (resolve, reject) => {
      await instance
        .get(`/admin/user/game?id=${id}`, {
          headers: {
            Authorization: "Bearer " + getCookie("token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  deleteUserById: async (id) => {
    console.log(id);
    return new Promise(async (resolve, reject) => {
      await instance
        .delete(`/user/${id}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },

  createUser: async (body) => {
    return new Promise(async (resolve, reject) => {
      await instance
        .post("/user", body)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
  changePassword: async (password, token) => {
    return new Promise(async (resolve, reject) => {
      await instance
        .patch(
          "/auth/changePassword",
          { password },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};

export default API;
