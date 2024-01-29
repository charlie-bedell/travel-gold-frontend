import * as tokenService from "./tokenService.js";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;

function getUser() {
  return tokenService.getUserFromToken();
}

async function signup(user) {
  try {
    const res = await axios.post(`${BASE_URL}/signup`,JSON.stringify(user),{ headers: {"Content-Type": "application/json"}});
    // const res = await fetch(`${BASE_URL}/signup`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(user),
    // });
    console.log("res: ", res);
    console.log("res data: ", res.data());
    console.log("res json: ", res.json());
    const json = await res.json();
    if (json.token) {
      tokenService.setToken(json.token);
      return json.token;
    }
    if (json.err) {
      throw new Error(json.err);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function login(credentials) {
  // const res = await fetch(`${BASE_URL}/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(credentials),
  // });
  
  const res = await axios.post(`${BASE_URL}/login`, JSON.stringify(credentials), { headers: {"Content-Type": "application/json"}});
  console.log("res: ", res);
  console.log("res data: ", res.data());
  console.log("res json: ", res.json());
  const json = await res.json();

  if (json.token) {
    tokenService.setToken(json.token);
  }

  if (json.err) {
    throw new Error(json.err);
  }
}

function logout() {
  tokenService.removeToken();
}

export { signup, getUser, logout, login };
