import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import ConfirmDialog from "../components/ConfirmDialog"; // Import the dialog
import type { User } from "../types/user";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // New state for the delete dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res.data);

      // We define freshUsers here to store the latest data from the server
      const freshUsers: User[] = res.data;
      setUsers(freshUsers);

      // If the list is now empty, definitely clear the form
      if (freshUsers.length === 0) {
        setEditingUser(undefined);
      }
      // Otherwise, check if the user we were editing was removed by someone else/another tab
      else if (
        editingUser &&
        !freshUsers.find((u: User) => u.id === editingUser.id)
      ) {
        setEditingUser(undefined);
      }
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
        setEditingUser(undefined); // Clear editing state after success
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

  // Triggered when clicking 'Delete' in the list
  const openDeleteModal = (id: number) => {
    setUserIdToDelete(id);
    setIsDialogOpen(true);
  };

  // Triggered when clicking 'Confirm' in the Modal
  const handleConfirmDelete = async () => {
    if (userIdToDelete === null) return;

    try {
      setLoading(true);
      await deleteUser(userIdToDelete);

      if (editingUser?.id === userIdToDelete) {
        setEditingUser(undefined);
      }
      fetchUsers();
    } catch {
      setError("Failed to delete user");
    } finally {
      setLoading(false);
      setUserIdToDelete(null); // Clean up
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">User Management</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-[400px_1fr] gap-8">
        <div>
          <UserForm onSubmit={handleSubmit} defaultValues={editingUser} />
          {editingUser && (
            <button
              onClick={() => setEditingUser(undefined)}
              className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          {loading && users.length === 0 ? (
            <p className="text-gray-500 animate-pulse">Loading users...</p>
          ) : (
            <UserList
              users={users}
              onDelete={openDeleteModal} // Connect to modal trigger
              onEdit={setEditingUser}
            />
          )}
        </div>
      </div>

      {/* The Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message="Are you sure you want to remove this user? This action cannot be undone."
      />
    </div>
  );
}
