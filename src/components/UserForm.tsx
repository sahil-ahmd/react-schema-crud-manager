import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormFields } from "../config/userFormConfig";
import type { User } from "../types/user";
import { userSchema } from "../schema/userSchema";
import { useEffect } from "react";

interface Props {
  onSubmit: (data: User) => void;
  defaultValues?: User;
  onCancel: (data?: any) => void;
}

export default function UserForm({ onSubmit, defaultValues, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const isEditing = !!defaultValues?.id;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      // This triggers when setEditingUser(undefined) is called
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    }
  }, [defaultValues, reset]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
      className="max-w-md w-full bg-white border border-neutral-200 p-6 rounded-lg shadow-md"
    >
      {/* Dynamic Title */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {isEditing ? "Edit User" : "Add New User"}
      </h2>

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

      <div className="flex flex-col gap-2 mt-6">
        <button
          type="submit"
          className={`w-full py-2 rounded-md text-white font-medium transition shadow-sm ${
            isEditing
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isEditing ? "Update User" : "Save User"}
        </button>

        {/* The Cancel Button */}
        {isEditing && (
          <button
            type="button" // Important: set to "button" so it doesn't trigger form submit
            onClick={onCancel}
            className="w-full py-2 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
