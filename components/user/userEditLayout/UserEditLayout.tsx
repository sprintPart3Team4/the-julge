// 알바님 - 편집페이지
import CloseButton from "@/components/common/closeButton/CloseButton";
import TitleBox from "@/components/common/titleBox/TitleBox";
import UserInfoForm from "@/components/register/userInfo/userInfoForm/UserInfoForm";
import Modal from "@/components/common/modal/Modal";
import classNames from "classnames/bind";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "./UserEditLayout.module.scss";

const cn = classNames.bind(styles);

export default function UserEditLayout() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleState = () => {
    setIsModalOpen(true);
  };

  const handleYesButtonClick = () => {
    setIsModalOpen(false);
    router.push("/profile");
  };

  return (
    <div className={cn("Wrap")}>
      <div className={cn("titleWrap")}>
        {/* <TitleBox /> */}
        <div className={cn("titleBox")}>내프로필</div>
        <CloseButton stateToggle={toggleState} />
      </div>
      <UserInfoForm />
      {isModalOpen && (
        <Modal>
          <Modal.YesOrNo
            text="등록을 취소하시겠습니까?"
            yesButtonText="승인하기"
            setIsModalOpen={setIsModalOpen}
            handleYesButtonClick={handleYesButtonClick}
          />
        </Modal>
      )}
    </div>
  );
}
