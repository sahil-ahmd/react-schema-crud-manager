import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import type { User } from "../types/user";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userApi";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (user: User) => {
    try {
      setLoading(true);
      if (editingUser?.id) {
        await updateUser(editingUser.id, user);
        setEditingUser(undefined);
      } else {
        await createUser(user);
      }
      fetchUsers();
    } catch {
      setError("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteUser(id);
      fetchUsers();
    } catch {
      setError("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        User Management
      </h1>

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <UserForm
          onSubmit={handleSubmit}
          defaultValues={editingUser}
        />

        <div>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <UserList
              users={users}
              onDelete={handleDelete}
              onEdit={setEditingUser}
            />
          )}
        </div>
      </div>
    </div>
  );
}
