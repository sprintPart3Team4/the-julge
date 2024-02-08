import { useState, MouseEventHandler, MouseEvent } from "react";
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
  const buttonText = isPageOpen ? "등록을 취소하시겠어요?" : "수정을 취소하시겠어요?"

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    isPageOpen ? handleYesButtonClick(e) : handleShopPage();
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleShopPage = () =>{
    router.push("/shop");
  }

  return (
    <div className={cn("wrapper")}>
      <div className={cn("container")}>
        <h2 className={cn("title")}>{title}</h2>
        <button
          className={cn("buttonCancel")}
          onClick={handleModalOpen}
          type="button"
        >
          취소
        </button>
        {isModalOpen && (
          <Modal>
            <Modal.YesOrNo
              text={buttonText}
              yesButtonText="취소하기"
              setIsModalOpen={setIsModalOpen}
              handleYesButtonClick={handleButtonClick}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}
