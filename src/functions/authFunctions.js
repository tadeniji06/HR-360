import axios from "axios";
import { apiUrl } from "../utils/api";
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async ({ name, email, password, position }) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, {
      name,
      email,
      password,
      position,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
