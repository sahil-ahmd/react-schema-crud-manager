import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormFields } from "../config/userFormConfig";
import type { User } from "../types/user";
import { userSchema } from "../schema/userSchema";

interface Props {
  onSubmit: (data: User) => void;
  defaultValues?: User;
}

export default function UserForm({ onSubmit, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="max-w-md bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">User Form</h2>

      {userFormFields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {field.label}
          </label>

          <input
            id={field.name}
            type={field.type}
            {...register(field.name as keyof User)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2
              ${
                errors[field.name as keyof User]
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }
            `}
          />

          {errors[field.name as keyof User] && (
            <p className="text-red-500 text-xs mt-1">
              {errors[field.name as keyof User]?.message}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Save User
      </button>
    </form>
  );
}
