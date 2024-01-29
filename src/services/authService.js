import * as tokenService from "./tokenService.js";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;

function getUser() {
  return tokenService.getUserFromToken();
}

async function signup(user) {
  try {
    const res = await axios.post(`${BASE_URL}/signup`,JSON.stringify(user),{ headers: {"Content-Type": "application/json"}});
    const json = res.data;
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
  const res = await axios.post(`${BASE_URL}/login`, JSON.stringify(credentials), { headers: {"Content-Type": "application/json"}});
  
  const json = res.data;

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
