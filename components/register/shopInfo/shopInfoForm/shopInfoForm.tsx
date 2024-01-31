import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./Input";
import SelectBox from "./SelectBox";
import Textarea from "./Textarea";
import FileInput from "./FileInput";
import TextInput from "./TextInput";
import Button from "@/components/common/button/Button";
import { useAuth } from "@/contexts/AuthProvider";
import { FOOD_CATEGORY, ADDRESS } from "./constants";
import { FormValues } from "./type";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function ShopInfoForm() {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    category: "선택",
    address1: "선택",
    address2: "",
    description: "",
    imageUrl: "",
    originalHourlyPay: 0,
  });
  const wage = formValues.originalHourlyPay !== 0 ? formValues.originalHourlyPay : "";

  const { registerShop } = useAuth();

  const handleValueChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const values = name === "originalHourlyPay" ? Number(value) : value;

    setFormValues({
      ...formValues,
      [name]: values,
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerShop(formValues);
  };

  return (
    <div className={cn("container")}>
      <form onSubmit={handleFormSubmit}>
        <div className={cn("inputWrap")}>
          <Input
            label="name"
            title="가게 이름"
            input={{
              type: "text",
              id: "name",
              name: "name",
            }}
            value={formValues.name}
            onChange={handleValueChange}
          />
          <SelectBox
            label="category"
            title="분류*"
            item={FOOD_CATEGORY}
            value={formValues.category}
            setFormValues={setFormValues}
          />
          <SelectBox
            label="address1"
            title="주소*"
            item={ADDRESS}
            value={formValues.address1}
            setFormValues={setFormValues}
          />
          <Input
            label="address2"
            title="상세 주소"
            input={{
              type: "text",
              id: "address2",
              name: "address2",
            }}
            value={formValues.address2}
            onChange={handleValueChange}
          />
          <TextInput
            label="originalHourlyPay"
            title="기본 시급"
            text="원"
            input={{
              type: "number",
              id: "originalHourlyPay",
              name: "originalHourlyPay",
            }}
            value={wage}
            onChange={handleValueChange}
          />
        </div>
        <FileInput setFormValues={setFormValues} />
        <Textarea
          label="description"
          title="가게 설명"
          textarea={{
            id: "description",
            name: "description",
          }}
          value={formValues.description}
          onChange={handleValueChange}
        />
        <div className={cn("buttonWrap")}>
          <Button text="등록하기" size="reactive" color="primary" />
        </div>
      </form>
    </div>
  );
}
