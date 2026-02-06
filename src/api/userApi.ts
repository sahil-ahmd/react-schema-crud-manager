import axios from "axios";
import type { User } from "../types/user";

const API_URL = "http://localhost:5000/users";

export const getUsers = () => axios.get<User[]>(API_URL);

export const createUser = (user: User) => axios.post<User>(API_URL, user);

export const updateUser = (id: number, user: User) =>
  axios.put<User>(`${API_URL}/${id}`, user);

export const deleteUser = (id: number) => axios.delete(`${API_URL}/${id}`);
