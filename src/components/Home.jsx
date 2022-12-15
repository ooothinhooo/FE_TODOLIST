import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { createTodo, deleteTodo, getApi } from "../services/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_URL } from "../config.js";
function Home() {
  const navigation = useNavigate();
  const info = localStorage.getItem("user");
  const [user, setUser] = useState(JSON.parse(info));
  // const [flag, setFlag] = useState();
  useEffect(() => {
    setUser(JSON.parse(info));
  }, []);

  const auth = user?.token;
  const [tasks, setTasks] = useState();
  const getTasks = async () => {
    // setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/todolist`, {
        headers: {
          auth: auth,
        },
      });
      setTasks(Object(data?.data?.todos));
      // setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const [desc, setDesc] = useState();
  // console.log(desc);
  const handlerCreateTodo = async () => {
    const result = await createTodo(desc, auth);
    if (result.status == 200) {
      if (result.data.status === 200) {
        toast(result.data.message);
        // console.log(result.data.message);
        // localStorage.setItem("todos", JSON.stringify(result.data.data));
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
        getTasks();

        return;
      }
      if (result.data.status === 201) {
        // setErorrs(result.data.data);
        console.log(result.data.data);
        toast(result.data.data);
        return;
      }

      if (result.data.status === 202) {
        toast(result.data.message);
        // console.log(result.data.message);
        return;
      }
    }
    // console.log(result);
  };

  const handlerDeleteTodo = async (id) => {
    const result = await deleteTodo(id, auth);
    if (result.status == 200) {
      if (result.data.status === 200) {
        toast(result.data.message);
        getTasks();

        // console.log(result.data.message);
        // localStorage.setItem("user", JSON.stringify(result.data.data));

        return;
      }
      if (result.data.status === 201) {
        // setErorrs(result.data.data);
        toast(result.data.data);
        // console.log(result.data.data);
        return;
      }

      if (result.data.status === 202) {
        toast(result.data.message);
        // console.log(result.data.message);
        return;
      }
    }
    // console.log(result);
  };

  function linkto() {
    navigation("/login");
    toast("Đăng xuất Thành Công");
  }
  return (
    <>
      <div className="container">
        <ToastContainer />

        <>
          {user?.username ? (
            <>
              <div class="form-group ">
                <label class="form-label mt-4">Create Todo</label>
                <div class="form-group">
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      onChange={(e) => setDesc(e.target.value)}
                      class="form-control mx-2"
                      placeholder="Description Todo"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <button
                      class="btn btn-primary"
                      type="button"
                      id="button-addon2"
                      onClick={handlerCreateTodo}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>{linkto()}</>
          )}
        </>
      </div>
      <div className="container bs-docs-section mt-4 ">
        <div className="row">
          {tasks ? (
            <>
              {tasks?.map((item) => {
                return (
                  <>
                    <>
                      <div
                        class="toast show my-2 col-lg-4 mx-2 "
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                      >
                        <div class="toast-header">
                          <strong class="me-auto">TODO</strong>
                          <small>{item?.date}</small>
                          <button
                            type="button"
                            onClick={(e) => handlerDeleteTodo(item?._id)}
                            class="btn-close ms-2 mb-1"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                          >
                            <span aria-hidden="true"></span>
                          </button>
                        </div>
                        <div class="toast-body">{item?.desc}</div>
                      </div>
                    </>
                  </>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
