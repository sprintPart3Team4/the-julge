import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "./Input";
import SelectBox from "./SelectBox";
import Textarea from "./Textarea";
import FileInput from "./FileInput";
import Button from "@/components/common/button/Button";
import { useAuth } from "@/contexts/AuthProvider";
import Modal from "@/components/common/modal/Modal";
import { FOOD_CATEGORY, ADDRESS } from "./constants";
import { FormValues } from "./type";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

const initialFormValues = {
  name: "",
  category: "선택",
  address1: "선택",
  address2: "",
  description: "",
  imageUrl: "",
  originalHourlyPay: 0,
};

export default function ShopInfoForm() {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();

  const wage = formValues.originalHourlyPay !== 0 ? formValues.originalHourlyPay : "";
  const isRequired =
    formValues.name !== "" &&
    formValues.address2 !== "" &&
    formValues.address1 !== "선택" &&
    formValues.category !== "선택" &&
    formValues.originalHourlyPay !== 0;

  const { registerShop } = useAuth();

  const handleValueChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const values = name === "originalHourlyPay" ? Number(value) : value;

    setFormValues({
      ...formValues,
      [name]: values,
    });
  };

  const handleRegisterForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerShop(formValues);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleButtonClick = () => {
    router.push("/shop");
    setIsModalOpen(false);
  };

  return (
    <div className={cn("container")}>
      <form onSubmit={handleRegisterForm}>
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
          <Input
            label="originalHourlyPay"
            title="기본 시급"
            floatingText="원"
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
        <div className={cn("buttonWrap")} onClick={handleModalOpen}>
          <Button text="등록하기" size="reactive" color={isRequired ? "primary" : "disabled"} />
        </div>
      </form>
      <div>
        {isModalOpen && (
          <Modal>
            <Modal.Confirm text="등록이 완료되었습니다." handleButtonClick={handleButtonClick} />
          </Modal>
        )}
      </div>
    </div>
  );
}
