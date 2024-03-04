import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({
        message: "Account created successfully",
        type: "success",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "error",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="font-bold text-3xl">Create an account</h2>
      <div className="flex md:flex-row flex-col gap-5">
        <label className="flex-1 font-bold text-gray-700text-sm">
          First Name
          <input
            className="px-2 py-1 border rounded w-full font-normal"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </label>
        <label className="flex-1 font-bold text-gray-700text-sm">
          Last Name
          <input
            className="px-2 py-1 border rounded w-full font-normal"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </label>
      </div>
      <label className="flex-1 font-bold text-gray-700text-sm">
        Email
        <input
          className="px-2 py-1 border rounded w-full font-normal"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </label>
      <label className="flex-1 font-bold text-gray-700text-sm">
        Password
        <input
          className="px-2 py-1 border rounded w-full font-normal"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </label>
      <label className="flex-1 font-bold text-gray-700text-sm">
        Confirm Password
        <input
          className="px-2 py-1 border rounded w-full font-normal"
          type="password"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "Confirm Password is required";
              } else if (watch("password") !== value) {
                return "Passwords do not match";
              } else {
                return true;
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-bold text-white"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
