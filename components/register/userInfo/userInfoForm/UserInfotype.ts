import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface CommonProps {
  label: string;
  title: string;
  defaultValue: string | number;
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
  };
  text?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectBox extends CommonProps {
  item: {
    id: string;
    name: string;
  }[];
  isSelected?: boolean;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
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

export type FormValues = {
  name: string;
  phone: string;
  address: string;
  bio: string;
};
