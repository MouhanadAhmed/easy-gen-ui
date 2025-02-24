"use client";

import { type AxiosError } from "axios";

import { type ErrorApiResponse } from "@/types/error-api-response";
import type { AllUsers, User } from "@/types/user";
import { API_URL } from "@/lib/env-config";

import axiosInstance from "./axios.instance";

export async function findAllUsers(
  pageNumber = 1,
  pageLength = 30,
): Promise<AllUsers> {
  try {
    const url = `${API_URL}user?page=${String(pageNumber)}&pageLength=${String(pageLength)}`;

    const response = await axiosInstance.get<AllUsers>(url);
    return response.data; // Return only the data from the response
  } catch (error) {
    throw new Error(
      (error as AxiosError<ErrorApiResponse>).response?.data?.message ??
        (error as AxiosError).message ??
        "Failed to findAll users data",
    );
  }
}
export async function createUser(user: User): Promise<User> {
  try {
    const url = `${API_URL}user`;

    const response = await axiosInstance.post<User>(url, user);
    return response.data; // Return only the data from the response
  } catch (error) {
    throw new Error(
      (error as AxiosError<ErrorApiResponse>).response?.data?.message ??
        (error as AxiosError).message ??
        "Failed to create user",
    );
  }
}
export async function deleteUser(id: string): Promise<User> {
  try {
    const url = `${API_URL}user/${id}`;

    const response = await axiosInstance.delete<User>(url);
    return response.data; // Return only the data from the response
  } catch (error) {
    throw new Error(
      (error as AxiosError<ErrorApiResponse>).response?.data?.message ??
        (error as AxiosError).message ??
        "Failed to delete user",
    );
  }
}
export async function updateUser(
  id: string,
  updatedUser: object,
): Promise<User> {
  try {
    const url = `${API_URL}user/${id}`;

    const response = await axiosInstance.patch<User>(url, updatedUser);
    return response.data; // Return only the data from the response
  } catch (error) {
    throw new Error(
      (error as AxiosError<ErrorApiResponse>).response?.data?.message ??
        (error as AxiosError).message ??
        "Failed to update user",
    );
  }
}
export async function getUserById(id: string): Promise<User> {
  try {
    const url = `${API_URL}user/${id}`;

    const response = await axiosInstance.get<User>(url);
    return response.data; // Return only the data from the response
  } catch (error) {
    throw new Error(
      (error as AxiosError<ErrorApiResponse>).response?.data?.message ??
        (error as AxiosError).message ??
        "Failed to get user data",
    );
  }
}
