import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthProvider";
import CloseButton from "@/components/common/closeButton/CloseButton";
import UserInfoForm from "@/components/register/userInfo/userInfoForm/UserInfoForm";
import Modal from "@/components/common/modal/Modal";
import MainTitle from "@/components/common/titleBox/mainTitle/MainTitle";
import classNames from "classnames/bind";

import styles from "./UserEditLayout.module.scss";

const cn = classNames.bind(styles);

export default function UserEditLayout() {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleState = () => {
    const isCheck = user?.name == undefined && user?.address === undefined && user?.phone === undefined;
    if (!isCheck) {
      setIsEditModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleYesButtonClick = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    router.push("/profile");
  };

  return (
    <div className={cn("Wrap")}>
      <div className={cn("titleWrap")}>
        <MainTitle mainTitle="내 프로필"></MainTitle>
        <CloseButton stateToggle={toggleState} />
      </div>
      <UserInfoForm />
      {isModalOpen && (
        <Modal>
          <Modal.YesOrNo
            text="등록을 취소하시겠습니까?"
            yesButtonText="취소하기"
            setIsModalOpen={setIsModalOpen}
            handleYesButtonClick={handleYesButtonClick}
          />
        </Modal>
      )}
      {isEditModalOpen && (
        <Modal>
          <Modal.YesOrNo
            text="수정을 취소하시겠습니까?"
            yesButtonText="취소하기"
            setIsModalOpen={setIsEditModalOpen}
            handleYesButtonClick={handleYesButtonClick}
          />
        </Modal>
      )}
    </div>
  );
}
