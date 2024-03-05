import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-3 font-bold text-3xl">Add Hotel</h1>
      <label className="flex-1 font-bold text-gray-700text-sm">
        Name
        <input
          className="px-2 py-1 border rounded w-full font-normal"
          type="text"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </label>
    </div>
  );
};

export default DetailsSection;
