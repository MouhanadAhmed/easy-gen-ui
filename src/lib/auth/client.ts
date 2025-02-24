"use client";

import axiosInstance from "../../services/axios.instance";
import axios, { type AxiosError } from "axios";

import type { LoggedInUser } from "../../types/user";



export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  role?: string;
}


export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

interface ErrorResponseData {
  message?: string;
}

interface APIResponse {
  data?: {
    loggedInUser?: LoggedInUser;
    message?: string;
    jwt?: string;
  };
  error?: string;
}


class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    let response: APIResponse;

    try {
      response = await axios.post(`https://ecommerce-jwjk.onrender.com/v1/auth/Signup`, params);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseData>;
      response = { error: axiosError.response?.data?.message };
    }
    return { error: response.data?.message || response.error || " " };
  }



  async signInWithPassword(
    params: SignInWithPasswordParams,
  ): Promise<{ error?: string }> {
    let response: APIResponse;

    try {
      response = await axios.post(`https://ecommerce-jwjk.onrender.com/v1/auth/login`, params);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseData>;
      response = { error: axiosError.response?.data?.message };
    }
    console.log("login response",response)
    if (response?.data?.message === "success") {
      localStorage.setItem("custom-auth-token", String(response?.data?.jwt));

      const userData = response?.data?.loggedInUser;
      localStorage.setItem("custom-auth-role", String(userData?.role));

      localStorage.setItem(
        "custom-auth-user",
        JSON.stringify({
          name: userData?.name,
          email: userData?.email,
          role: userData?.role,
        }),
      );

      return {};
    }

    return { error: (response.data?.message ?? response.error) || "" };
  }


  async signOut(): Promise<{ error?: string }> {
    let response: APIResponse;

    try {
      response = await axiosInstance.post(`https://ecommerce-jwjk.onrender.com/v1/auth/logout`, {
        token: localStorage.getItem("custom-auth-token"),
      });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseData>;
      response = { error: axiosError.response?.data?.message };
    }

    localStorage.removeItem("custom-auth-token");
    if (response?.data?.message === "success") {
      localStorage.removeItem("custom-auth-token");
      localStorage.removeItem("custom-auth-role");
      localStorage.removeItem("custom-auth-user");
      return {};
    }
    return { error: response?.data?.message ?? response.error ?? "" };
  }
}

export const authClient = new AuthClient();
