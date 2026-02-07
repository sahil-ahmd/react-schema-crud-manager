import { Edit, Trash } from "lucide-react";
import type { User } from "../types/user";

interface Props {
  users: User[];
  onDelete: (id: number) => void;
  onEdit: (user: User) => void;
}

export default function UserList({
  users,
  onDelete,
  onEdit,
}: Props) {
    // Helper to get initials
    const getInitials = (firstName: string, lastName: string) => {
        const f = firstName?.charAt(0) || "";
        const l = lastName?.charAt(0) || "";
        return (f + l).toUpperCase();
      };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
          <th className="py-4 px-3 font-semibold w-16 text-center">Photo</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              First
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Last
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Phone
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center text-gray-500 py-6"
              >
                No users found
              </td>
            </tr>
          )}

          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t hover:bg-gray-50"
            >
                <td className="py-4 px-3">
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white ring-offset-2">
                    {getInitials(user.firstName, user.lastName)}
                  </div>
                </div>
              </td>
              <td className="px-4 py-2">
                {user.firstName}
              </td>
              <td className="px-4 py-2">
                {user.lastName}
              </td>
              <td className="px-4 py-2">
                {user.email}
              </td>
              <td className="px-4 py-2">
                {user.phone}
              </td>
              <td className="px-4 py-2 space-x-4">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:bg-blue-100 p-1 rounded-md"
                >
                  <Edit className="size-5" />
                </button>
                <button
                  onClick={() =>
                    user.id && onDelete(user.id)
                  }
                  className="text-red-500 hover:bg-red-100 p-1 rounded-md"
                >
                  <Trash className="size-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
