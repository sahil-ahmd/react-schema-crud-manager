import axios from "axios";
import type { User } from "../types/user";

// Use an environment variable, with a fallback for local development
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/users`;

export const getUsers = () => axios.get<User[]>(API_URL);

export const createUser = (user: User) => axios.post<User>(API_URL, user);

export const updateUser = (id: number, user: User) =>
  axios.put<User>(`${API_URL}/${id}`, user);

export const deleteUser = (id: number) => axios.delete(`${API_URL}/${id}`);
