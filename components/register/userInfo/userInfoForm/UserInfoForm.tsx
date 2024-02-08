import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/common/input/Input";
import SelectBox from "@/components/common/SelectBox/SelectBoxDropDown";
import Textarea from "@/components/common/textarea/Textarea";
import Button from "@/components/common/button/Button";
import { useAuth } from "@/contexts/AuthProvider";
import Modal from "@/components/common/modal/Modal";
import { ADDRESS } from "../../../common/SelectBox/constants";
import { FormValues } from "./UserInfotype";
import classNames from "classnames/bind";
import styles from "./UserInfoForm.module.scss";

const cn = classNames.bind(styles);

const initialFormValues = {
  name: "",
  phone: "",
  address: "선택",
  bio: "",
};

export default function userInfoForm() {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>("");
  const router = useRouter();
  const { user, updateMe } = useAuth();
  const isRequired = formValues.name !== "" && formValues.address !== "선택" && formValues.phone !== "";
  const [isRegister, setIsRegister] = useState<string>("등록하기");
  // 수정하기 -> 완료하기
  // 필수속성에 값이 들어가야 버튼이 활성화 되게끔 바꾸기
  // input

  useEffect(() => {
    const userInfo: FormValues = {
      name: user?.name || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
      address: user?.address || "선택",
    };
    setFormValues(userInfo);
    getCheckEdit();
  }, [user]);

  const getCheckEdit = () => {
    const isCheck = user?.name === undefined && user?.address === undefined && user?.phone === undefined;
    if (!isCheck) {
      setIsRegister("완료하기");
    } else {
      setIsRegister("등록하기");
    }
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRegisterForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMe(formValues);
    setModalText(isRegister === "완료하기" ? "수정이 완료되었습니다." : "등록이 완료되었습니다.");
    setIsModalOpen(true);
  };

  const handleModalButtonClick = () => {
    setIsModalOpen(false);
    router.push("/profile");
  };

  return (
    <div className={cn("container")}>
      <form
        onSubmit={(e) => {
          handleRegisterForm(e);
        }}
      >
        <div className={cn("inputWrap")}>
          <Input
            placeholder="입력"
            label="name"
            title="이름"
            input={{
              type: "text",
              id: "name",
              name: "name",
            }}
            value={formValues.name}
            onChange={handleValueChange}
          />
          <Input
            placeholder="입력"
            label="phone"
            title="전화번호"
            input={{
              type: "text",
              id: "phone",
              name: "phone",
            }}
            value={formValues.phone}
            onChange={handleValueChange}
          />
          <SelectBox
            className={cn("selectBox")}
            label="address"
            title="선호지역*"
            item={ADDRESS}
            value={formValues.address}
            setFormValues={setFormValues}
          />
        </div>
        <Textarea
          label="bio"
          title="소개"
          textarea={{
            id: "bio",
            name: "bio",
          }}
          value={formValues.bio}
          onChange={handleValueChange}
        />
        <div className={cn("buttonWrap")}>
          <Button text={isRegister} size="flexible" color={isRequired ? "primary" : "disabled"} />
        </div>
      </form>
      <div>
        {isModalOpen && (
          <Modal>
            <Modal.Confirm text={modalText} handleButtonClick={handleModalButtonClick} />
          </Modal>
        )}
      </div>
    </div>
  );
}
