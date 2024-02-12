import { Dispatch, SetStateAction } from "react";

export interface CommonProps {
  label: string;
  title: string;
  value: string | number;
}

export interface SelectBox extends CommonProps {
  item?: {
    id: string;
    name: string;
  }[];
  isSelected?: boolean;
  value: string;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
}

export interface FileInput {
  setFormValues: Dispatch<SetStateAction<FormValues>>;
  value: string;
}
export interface Item {
  id: string;
  name: string;
}
export interface FormValues {
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
}