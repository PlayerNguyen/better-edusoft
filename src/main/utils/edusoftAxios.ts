import axios from "axios";

export const EDUSOFT_WEB_URL = "https://edusoftweb.hcmiu.edu.vn/";

const i = axios.create({
  baseURL: EDUSOFT_WEB_URL,
});

export const EdusoftAxios = i;
