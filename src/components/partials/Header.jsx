import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getApi } from "../../services/api.js";

function Header() {
  const info = localStorage.getItem("user");
  const [user, setUser] = useState(JSON.parse(info));
  useEffect(() => {
    setUser(JSON.parse(info));
  }, []);

  function deleteItem() {
    toast("Đăng xuất Thành Công");
    localStorage.removeItem("user");
    window.location.reload();

    setUser(null);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            TODO APP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  {user?.username}
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                {user?.username == undefined ? (
                  <>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </li>
              <li className="nav-item">
                {user?.username == undefined ? (
                  <>
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </li>
              <li className="nav-item">
                {!user?.username == "" ? (
                  <>
                    <a onClick={deleteItem} className="nav-link" href="#">
                      Logout
                    </a>
                  </>
                ) : (
                  <></>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
