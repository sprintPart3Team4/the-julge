import { useState, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import Modal from "@/components/common/modal/Modal";
import classNames from "classnames/bind";
import styles from "./ShopInfoTitle.module.scss";

const cn = classNames.bind(styles);
interface Props {
  title: string;
  isPageOpen?: boolean;
  handleYesButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function ShopInfoTitle({
  title,
  handleYesButtonClick = () => {},
  isPageOpen,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleShopPage = () => {
    router.push("/shop");
  }

  return (
    <div className={cn("wrapper")}>
      <div className={cn("container")}>
        <h2 className={cn("title")}>{title}</h2>
        <button
          className={cn("buttonCancel")}
          onClick={() => {
            isPageOpen ? handleModalOpen() : handleShopPage();
          }}
          type="button"
        >
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
    </div>
  );
}
