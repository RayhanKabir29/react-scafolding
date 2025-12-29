/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_BASE_URL } from "../helpers";

export const getData = async (url: string, params?: any) => {
  const authToken = localStorage.getItem("token"); // Example of getting a token from local storage
  try {
    const res = await axios.get(`${API_BASE_URL}/${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return {
      success: true,
      data: res?.data,
    };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      status: error?.response?.status,
      message: error?.response?.data?.message || "An error occurred",
    };
  }
};
