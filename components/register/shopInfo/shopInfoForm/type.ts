import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface CommonProps {
  label: string;
  title: string;
  value: string | number;
}
export interface Input extends CommonProps {
  input?: {
    type: string;
    id: string;
    name: string;
  };
  textarea?: {
    type: string;
    id: string;
    name: string;
  }
  text?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectBox extends CommonProps {
  item: {
    id: string;
    name: string;
  }[];
  isSelected?: boolean;
  setOptionValues: Dispatch<SetStateAction<string>>;
}
export interface Textarea extends CommonProps {
  textarea: {
    id: string;
    name: string;
  };
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
export interface Item {
  id: string;
  name: string;
}
export interface FormValues {
  description: string | number;
  address2: string | number;
  address1: string | number;
  name: string | number;
  originalHourlyPay: number;
  category: string | number;
  imageUrl: any;
  shopName: string;
  detailAddress: string;
  desc: string;
  wage: number;
}
