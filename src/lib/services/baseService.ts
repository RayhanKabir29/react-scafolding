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

export const getPaginatedData = async(url:string, params?: any) => {
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

export const getDetails = async (url: string, id?: string | number) => {
  const authToken = localStorage.getItem("token"); // Example of getting a token from local storage
  try {
    const modifyUrl = id ? `${url}/${id}` : url;
    const res = await axios.get(`${API_BASE_URL}/${modifyUrl}`, {
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
      data: {},
      status: error?.response?.status,
      message: error?.response?.data?.message || "An error occurred",
    };
  }
}

export const postData = async (url: string, body: any) => {
  const authToken = localStorage.getItem("token"); // Example of getting a token from local storage
  try {
    const res = await axios.post(`${API_BASE_URL}/${url}`, body, {
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
      data: {},
      status: error?.response?.status,
      message: error?.response?.data?.message || "An error occurred",
    };
  }
}

export const updateData = async (url: string, id: string | number, body: any) => {
  const authToken = localStorage.getItem("token"); // Example of getting a token from local storage
  try {
    const putUrl = id ? `${url}/${id}` : url;
    const res = await axios.put(`${API_BASE_URL}/${putUrl}`, body, {
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
      data: {},
      status: error?.response?.status,
      message: error?.response?.data?.message || "An error occurred",
    };
  }
}

export const deleteData = async (url: string, id: string | number) => {
  const authToken = localStorage.getItem("token"); // Example of getting a token from local storage
  try {
    const res = await axios.delete(`${API_BASE_URL}/${url}/${id}`, {
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
      data: {},
      status: error?.response?.status,
      message: error?.response?.data?.message || "An error occurred",
    };
  }
}