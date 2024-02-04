import { useState } from "react";
import SelectBox from "./SelectBox";
import { FormValues } from '@/components/register/shopInfo/shopInfoForm/type';

import { FOOD_CATEGORY } from "@/components/register/shopInfo/shopInfoForm/constants";

export default function SelectBox_example() {
  const initialFormValues = {
    name: "",
    category: "선택",
    address1: "선택",
    address2: "",
    description: "",
    imageUrl: "",
    originalHourlyPay: 0,
  };
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  return (
    <SelectBox
      label="category"
      title="분류*"
      item={FOOD_CATEGORY}
      defaultValue={formValues.category}
      setFormValues={setFormValues}
    />
  );
}
