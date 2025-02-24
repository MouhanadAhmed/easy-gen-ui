"use client";

import axiosInstance from "../../services/axios.instance";
import axios, { type AxiosError } from "axios";

import type { LoggedInUser, User } from "../../types/user";



const user = {
  name: "Sofia Rivers",
  _id: "USR-000",
  email: "sofia@devias.io",
  role: "user",
} satisfies User;

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  role?: string;
  lead_campaign?: number;
  recaptchaToken?: string;
}

export interface SignInWithOAuthParams {
  provider: "google" | "discord";
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
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

// const router =useRouter();
class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    let response: APIResponse;

    try {
      response = await axios.post(`${process.env.API_URL}auth/Signup`, params);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponseData>;
      response = { error: axiosError.response?.data?.message };
    }
    // router.push(`${FRONT_URL}/auth/sign-in`);
    //window.location.href = `${FRONT_URL}/auth/sign-in`;
    // router.push(`${FRONT_URL}/auth/sign-in`)
    // Refresh the auth state
    // UserProvider, for this case, will not refresh the router
    // After refresh, GuestGuard will handle the redirect
    // router.refresh();
    return { error: response.data?.message || response.error || " " };
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: "Social authentication not implemented" };
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

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Password reset not implemented" };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: "Update reset not implemented" };
  }

  async getUser(): Promise<{ data?: object | null; error?: string }> {
    const token = localStorage.getItem("custom-auth-token");

    if (!token) {
      return { data: null };
    }

    return { data: user };
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
