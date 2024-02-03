import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/common/input/Input";
import SelectBox from "./SelectBox";
import Textarea from "./Textarea";
import FileInput from "./FileInput";
import TextInput from "./TextInput";
import Button from "@/components/common/button/Button";
import { useAuth } from "@/contexts/AuthProvider";
import Modal from "@/components/common/modal/Modal";
import axios from "@/pages/api/axios";
import getCookies from "@/lib/getCookies";
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
  const [registerData, setRegisterData] = useState<FormValues>(initialFormValues);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();
  const { id } = router.query;

  const wage = formValues.originalHourlyPay !== 0 ? formValues.originalHourlyPay : "";
  const isRequired =
    formValues.name !== "" &&
    formValues.address2 !== "" &&
    formValues.address1 !== "선택" &&
    formValues.category !== "선택" &&
    formValues.originalHourlyPay !== 0;

  const { registerShop, updateShop } = useAuth();

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

  const handleEditForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateShop(formValues);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getRegisterData = async () => {
    const { token, shopId } = getCookies();

    const res = await axios.get(`shops/${shopId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRegisterData(res.data.item);
  };

  useEffect(() => {
    getRegisterData();
  }, []);

  return (
    <div className={cn("container")}>
      <form
        onSubmit={(e) => {
          id ? handleEditForm(e) : handleRegisterForm(e);
        }}
      >
        <div className={cn("inputWrap")}>
          <Input
            label="name"
            title="가게 이름"
            input={{
              type: "text",
              id: "name",
              name: "name",
            }}
            defaultValue={id ? registerData.name : formValues.name}
            onChange={handleValueChange}
          />
          <SelectBox
            label="category"
            title="분류*"
            item={FOOD_CATEGORY}
            defaultValue={id ? registerData.category : formValues.category}
            setFormValues={setFormValues}
          />
          <SelectBox
            label="address1"
            title="주소*"
            item={ADDRESS}
            defaultValue={id ? registerData.address1 : formValues.address1}
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
            defaultValue={id ? registerData.address2 : formValues.address2}
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
            defaultValue={id ? registerData.originalHourlyPay : wage}
            onChange={handleValueChange}
          />
        </div>
        <FileInput setFormValues={setFormValues} defaultValue={registerData.imageUrl} id={id} />
        <Textarea
          label="description"
          title="가게 설명"
          textarea={{
            id: "description",
            name: "description",
          }}
          defaultValue={id ? registerData.description : formValues.description}
          onChange={handleValueChange}
        />
        <div className={cn("buttonWrap")} onClick={handleButtonClick}>
          <Button text={id ? "완료하기" : "등록하기"} size="reactive" color={isRequired ? "primary" : "disabled"} />
        </div>
      </form>
      <div>
        {isModalOpen && (
          <Modal>
            <Modal.Confirm
              text={id ? "수정이 완료되었습니다." : "등록이 완료되었습니다."}
              handleButtonClick={handleCloseModal}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
