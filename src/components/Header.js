import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import icon from "../icons";
import SpinnerLoading from "./Loading";
const Header = () => {
  const url = window.location.pathname;
  const { UserIcon } = icon;
  const location = useLocation();
  const [actionDropdown, setActionDropdown] = useState(false);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [pending, setPending] = useState(false);
  return (
    <div className="w-screen h-[50px] border border-red-600 px-4 py-2 flex gap-4 items-center justify-between">
      <nav className="flex gap-4 items-center">
        <NavLink
          to={"/main"}
          className={`text-black opacity-70 text-decoration-none ${
            url === "/" ? "active" : null
          }`}
        >
          HOME
        </NavLink>
        <div className="text-black opacity-70 text-decoration-none relative cursor-pointer">
          <NavLink
            className={`text-black opacity-70 text-decoration-none ${
              url === "/" ? "active" : null
            }`}
            to={"/add"}
            onClick={() => {
              setActionDropdown(!actionDropdown);
            }}
          >
            ADD
          </NavLink>
        </div>
        <div className="text-black opacity-70 text-decoration-none"></div>
      </nav>
      <div className="flex items-center relative">
        <div onClick={() => setShowMenu(!showMenu)}>
          <UserIcon size={30} />
        </div>
        {showMenu && (
          <div className="absolute right-0 top-[calc(100%+12px)]">
            <div className="w-[200px]">
              <div
                className="p-2 border border-b-black cursor-pointer"
                onClick={() => {
                  navigate("/admin");
                  setShowMenu(!showMenu);
                }}
              >
                Manage account
              </div>
              <div
                className="p-2 border border-b-black cursor-pointer"
                onClick={() => {
                  setPending(true);
                  setTimeout(() => {
                    setPending(false);
                    const currentDate = new Date();
                    const expirationDate = new Date(currentDate.getTime());
                    document.cookie = `token=myTokenValue; expires=${expirationDate.toUTCString()}; path=/`;
                    navigate("/login");
                  }, 1000);
                }}
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
      {pending && <SpinnerLoading />}
    </div>
  );
};

export default Header;
