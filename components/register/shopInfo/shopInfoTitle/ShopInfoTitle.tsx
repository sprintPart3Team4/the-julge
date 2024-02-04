import { useState } from "react";
import Modal from "@/components/common/modal/Modal";
import ShopInfoForm from "../shopInfoForm/shopInfoForm";
import ShopPageLayout from "@/components/shop/shopPageLayout/ShopPageLayout";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoTitle/ShopInfoTitle.module.scss";

const cn = classNames.bind(styles);

export default function ShopInfoTitle({ title }: { title: string }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPageOpen, setIsPageOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleYesButtonClick = () => {
    setIsPageOpen(true);
  };

  return (
    <div className={cn("wraaper")}>
      {isPageOpen ? (
        <ShopPageLayout />
      ) : (
        <>
          <div className={cn("container")}>
            <h2 className={cn("title")}>{title}</h2>
            <button className={cn("buttonCancel")} onClick={handleModalOpen} type="button">
              취소
            </button>
            {isModalOpen && (
              <Modal>
                <Modal.YesOrNo
                  text="등록을 취소하시겠어요?"
                  yesButtonText="취소하기"
                  setIsModalOpen={setIsModalOpen}
                  handleYesButtonClick={handleYesButtonClick}
                />
              </Modal>
            )}
          </div>
          <ShopInfoForm />
        </>
      )}
    </div>
  );
}
