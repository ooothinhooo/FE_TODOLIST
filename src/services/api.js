import axios from "axios";
import {
  CREATETODO,
  DELETETODO,
  GETAPI,
  LOGIN,
  REGISTER,
} from "./apiConstant.js";

export const login = async (data) => {
  return axios.post(LOGIN, data);
};

export const register = async (data) => {
  return axios.post(REGISTER, data);
};

export const getApi = async (auth) => {
  return axios.get(GETAPI, {
    headers: {
      auth: auth,
    },
  });
};

export const createTodo = async (desc, auth) => {
  return axios({
    method: "post",
    url: CREATETODO,
    headers: { auth: auth },
    data: {
      desc: desc,
    },
  });
};
export const deleteTodo = async (id, auth) => {
  return axios({
    method: "post",
    url: DELETETODO,
    headers: { auth: auth },
    data: {
      todo_id: id,
    },
  });
};
