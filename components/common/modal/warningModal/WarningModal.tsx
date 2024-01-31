import classNames from "classnames/bind";
import Button from "../../button/Button";
import Warning from "@/public/images/warning.svg";

import styles from "./WarningModal.module.scss";
import Image from "next/image";

const cn = classNames.bind(styles);

type Props = {
  size: "normal" | "small";
  text: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// 만약 모달이 닫혔을 때, input의 value 값을 초기화하고 싶다는 등 handleButtonClick를 커스텀화하고 싶다면 수정 필요
export default function WarningModal({ size, text, setIsModalOpen }: Props) {
  const handleButtonClick = () => {
    setIsModalOpen(false);
  };

  const buttonSize = size === "normal" ? "checkModal" : "yesOrNoModal";

  return (
    <div className={cn("modal", size)}>
      <div className={cn("textWrap")}>
        <Image src={Warning} alt="경고" width={24} height={24} />
        <p className={cn("text")}>{text}</p>
      </div>
      <div className={cn("buttonPosition")}>
        <Button text="확인" size={buttonSize} color="secondary" handleButtonClick={handleButtonClick} />
      </div>
    </div>
  );
}
