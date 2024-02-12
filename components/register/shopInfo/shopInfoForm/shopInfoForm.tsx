import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Input from "@/components/common/input/Input";
import Textarea from "@/components/common/textarea/Textarea";
import SelectBoxDropDown from "@/components/common/SelectBox/SelectBoxDropDown";
import FileInput from "./FileInput";
import Button from "@/components/common/button/Button";
import { useAuth } from "@/contexts/AuthProvider";
import Modal from "@/components/common/modal/Modal";
import { FOOD_CATEGORY } from "./constants";
import { ADDRESS } from "@/components/common/SelectBox/constants";
import { FormValues } from "./type";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function ShopInfoForm({...shop}) {
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    category: "선택",
    address1: "선택",
    address2: "",
    description: "",
    imageUrl: "",
    originalHourlyPay: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();

  const isRequired =
    formValues.name !== "" &&
    formValues.address2 !== "" &&
    formValues.address1 !== "선택" &&
    formValues.category !== "선택" &&
    formValues.originalHourlyPay !== 0;
  const buttonText =  shop.name ? "완료하기" : "등록하기";
  const modalText = shop.name ? "수정이 완료되었습니다" : "등록이 완료되었습니다.";
  const buttonColor = isRequired || shop.name ? "primary" : "disabled";
  const { registerShop, updateShop } = useAuth();

  const wage = formValues.originalHourlyPay !== 0 ? formValues.originalHourlyPay : "";

  const handleValueChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const values = name === "originalHourlyPay" ? Number(value) || 0 : value;
    setFormValues({
      ...formValues,
      [name]: values,
    });
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    shop.name ? updateShop(formValues) : registerShop(formValues);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleButtonClick = () => {
    router.push("/shop")
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!formValues.imageUrl && shop.name) {
      setFormValues(shop as FormValues);
    }
  }, [shop]);

  return (
    <div className={cn("container")}>
      <form onSubmit={handleSubmitForm}>
        <div className={cn("inputWrap")}>
          <div className={cn("inputBox")}>
            <Input
              label="name"
              title="가게 이름"
              input={{
                type: "text",
                id: "name",
                name: "name",
              }}
              placeholder="입력"
              value={formValues.name}
              onChange={handleValueChange}
            />
          </div>
          <div className={cn("inputBox")}>
            <SelectBoxDropDown
              label="category"
              title="분류*"
              item={FOOD_CATEGORY}
              value={formValues.category}
              setFormValues={setFormValues}
            />
          </div>
          <div className={cn("inputBox")}>
            <SelectBoxDropDown
              label="address1"
              title="주소*"
              item={ADDRESS}
              value={formValues.address1}
              setFormValues={setFormValues}
            />
          </div>
          <div className={cn("inputBox")}>
            <Input
              label="address2"
              title="상세 주소"
              input={{
                type: "text",
                id: "address2",
                name: "address2",
              }}
              placeholder="입력"
              value={formValues.address2}
              onChange={handleValueChange}
            />
          </div>
          <div className={cn("inputBox")}>
            <Input
              label="originalHourlyPay"
              title="기본 시급"
              floatingText="원"
              input={{
                type: "number",
                id: "originalHourlyPay",
                name: "originalHourlyPay",
              }}
              placeholder="0"
              value={wage}
              onChange={handleValueChange}
            />
          </div>
        </div>
        <FileInput setFormValues={setFormValues} value={formValues.imageUrl} />
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
          <Button
            text={buttonText}
            size="fixed"
            color={buttonColor}
          />
        </div>
      </form>
      <div>
        {isModalOpen && (
          <Modal>
            <Modal.Confirm
              text={modalText}
              handleButtonClick={handleButtonClick}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
