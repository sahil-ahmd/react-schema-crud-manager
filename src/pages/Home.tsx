import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import ConfirmDialog from "../components/ConfirmDialog";
import type { User } from "../types/user";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";
import Toast from "../components/Toast";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      const freshUsers: User[] = res.data;
      setUsers(freshUsers);

      // Clean logic to reset form if the user being edited no longer exists
      if (
        freshUsers.length === 0 ||
        (editingUser && !freshUsers.find((u) => u.id === editingUser.id))
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
        // Trigger Toast for Update
        setToastMessage("User updated successfully!");
        setShowToast(true);
        setEditingUser(undefined);
      } else {
        await createUser(user);
        // Trigger Toast for Create
        setToastMessage("User created successfully!");
        setShowToast(true);
      }
      fetchUsers();
    } catch {
      setError("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: number) => {
    setUserIdToDelete(id);
    setIsDialogOpen(true);
  };

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
      setUserIdToDelete(null);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="mx-auto pb-4">
      <div className="py-6 flex items-center justify-center border-b border-neutral-200 mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-10 items-center max-w-5xl mx-auto">
        {/* Form Column - No extra buttons here, UserForm handles its own cancel button */}
        <UserForm
          onSubmit={handleSubmit}
          defaultValues={editingUser}
          onCancel={() => setEditingUser(undefined)}
        />

        {/* List Column */}
        <div className="bg-white w-full rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">All Users</h2>
            {/* The Count Badge */}
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {users.length} Total
            </span>
          </div>

          {loading && users.length === 0 ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 w-full bg-gray-100 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : (
            <UserList
              users={users}
              onDelete={openDeleteModal}
              onEdit={setEditingUser}
            />
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message="Are you sure you want to remove this user? This action cannot be undone."
      />
      <Toast
        isOpen={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
