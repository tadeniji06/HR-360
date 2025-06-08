import { apiUrl } from "../utils/api";
import axios from "axios";
import { getCookie } from "../utils/cookies";

// create axios instance
const authAxios = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

export default authAxios;

// request interceptors
authAxios.interceptors.request.use(
  (config) => {
    const token = getCookie("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Enhanced error handling
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error("Unauthorized access - redirecting to login");
    }
    return Promise.reject(error);
  }
);

// Create report function
export const createReport = async ({
  brand,
  deliverables,
  nextWeekTargets,
  additionalNotes,
}) => {
  try {
    const response = await authAxios.post(`/reports`, {
      brand,
      deliverables,
      nextWeekTargets,
      additionalNotes,
    });
    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error("Error creating report:", {
      status: error.response?.status,
      message: error.response?.data?.message,
      data: error.response?.data,
      details: error.response?.data?.details,
    });
    throw error;
  }
};

// get user reports

export const getReports = async () => {
  try {
    const response = await authAxios.get(`/reports/my-reports`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
