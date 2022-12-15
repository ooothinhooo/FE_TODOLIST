import React, { useEffect, useState } from "react";
import { login } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login({ user, setUser }) {
  const navigation = useNavigate();

  const [errors, setErorrs] = useState(null);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // useEffect(() => {
  //   if (user) {
  //     navigation("/");
  //   }
  // }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const result = await login(form);
    setErorrs(null);
    if (result.status == 200) {
      if (result.data.status === 200) {
        toast(result.data.message);
        toast("Vui Lòng Chờ");
        // console.log(result);
        localStorage.setItem("user", JSON.stringify(result.data.data));

        setTimeout(() => {
          navigation("/");
          window.location.reload();
        }, 2000);
        return;
      }
      if (result.data.status === 201) {
        setErorrs(result.data.data);
        toast(result.data.data);
        return;
      }

      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    }
    // console.log(result);
    const todo = localStorage.getItem("todos");

    if (todo == "") {
      toast("Bắt Đầu Làm Việc Với TODO APP nào!!!");
    } else {
      toast("Đang Cập Nhật Dữ Liệu");
    }
  };
  // toast("Vui Lòng Đăng Nhập");
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-4">
          <ToastContainer />
          <div className="col-lg-5 card border-primary mt-4 pb-4">
            <div className="card-header">TODO APP</div>
            <div className="card-body">
              <h4 className="card-title">LOGIN NOW</h4>
              <div class="form-group">
                <label for="exampleInputEmail1" class="form-label mt-4">
                  Email or Username
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email or username"
                />
                {errors?.username && (
                  <>
                    <small id="emailHelp" class="form-text text-danger">
                      {errors.username.msg}
                    </small>
                  </>
                )}
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1" class="form-label mt-4">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              {errors?.password && (
                <>
                  <small id="emailHelp" class="form-text  text-danger">
                    {errors.password.msg}
                  </small>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              class="btn btn-secondary"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
