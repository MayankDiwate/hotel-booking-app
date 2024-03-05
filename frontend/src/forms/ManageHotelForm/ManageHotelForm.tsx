import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";

export type HotelFormData = {
  name: string;
  description: string;
  city: string;
  country: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
}

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  
  return <FormProvider {...formMethods}>
    <form>
      <DetailsSection />
    </form>
  </FormProvider>;
};

export default ManageHotelForm;
