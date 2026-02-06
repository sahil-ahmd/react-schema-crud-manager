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
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
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
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    user.id && onDelete(user.id)
                  }
                  className="text-red-600 hover:underline text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
