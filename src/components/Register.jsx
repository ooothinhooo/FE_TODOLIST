import React from "react";
import { useState } from "react";
import { register } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import sweetalert from "../func/sweetalert.js";

function Register() {
  const navigation = useNavigate();
  const [errors, setErorrs] = useState(null);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const result = await register(form);
    // console.log(result);
    // console.info(form);
    if (result.status == 200) {
      if (result.data.status === 200) {
        // localStorage.setItem("user", JSON.stringify(result.data.data));
        toast("Register Successfully");

        // sweetalert("Register Successfully", "2000");
        setTimeout(() => {
          navigation("/login");
        }, 2000);
        return;
      }
      if (result.data.status === 201) {
        setErorrs(result.data.data);
        // console.log("201", result.data.data);
        toast(result.data.data);
        return;
      }

      if (result.data.status === 202) {
        // console.log("202", result.data);

        toast(result.data.message);
        return;
      }
    }
  };
  return (
    <>
      <div className="container">
        <ToastContainer />

        <div className="row justify-content-center mt-4">
          <div className="col-lg-5 card border-primary mt-4 pb-4">
            <div className="card-header">TODO APP</div>
            <div className="card-body">
              <h4 className="card-title">REGISTER NOW</h4>
              <div class="form-group">
                {/* <label class="form-label mt-4">Floating labels</label> */}
                <div class="form-floating mb-3">
                  <input
                    onChange={handleChange}
                    name="name"
                    type="text"
                    class="form-control"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Name</label>
                  {errors?.name && (
                    <>
                      <small id="emailHelp" class="form-text text-danger">
                        {errors.name.msg}
                      </small>
                    </>
                  )}
                </div>
                <div class="form-floating mb-3">
                  <input
                    onChange={handleChange}
                    name="username"
                    type="text"
                    class="form-control"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Username</label>
                  {errors?.username && (
                    <>
                      <small id="emailHelp" class="form-text text-danger">
                        {errors.username.msg}
                      </small>
                    </>
                  )}
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    onChange={handleChange}
                    name="email"
                    class="form-control"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Email address</label>
                  {errors?.email && (
                    <>
                      <small id="emailHelp" class="form-text text-danger">
                        {errors.email.msg}
                      </small>
                    </>
                  )}
                </div>

                <div class="form-floating mb-3">
                  <input
                    type="password"
                    onChange={handleChange}
                    name="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                  <label for="floatingPassword">Password</label>
                  {errors?.password && (
                    <>
                      <small id="emailHelp" class="form-text text-danger">
                        {errors.password.msg}
                      </small>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              type="button"
              class="btn btn-outline-secondary"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
