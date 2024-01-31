import { MouseEventHandler } from "react";
import Image from "next/image";
import classNames from "classnames/bind";

import Button from "../../button/Button";

import Check from "@/public/images/check.svg";

import styles from "./YesOrNoModal.module.scss";

const cn = classNames.bind(styles);

type Props = {
  text: string;
  yesButtonText: "취소하기" | "거절하기";
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleYesButtonClick: MouseEventHandler<HTMLButtonElement>;
};

export default function YesOrNoModal({ text, yesButtonText, setIsModalOpen, handleYesButtonClick }: Props) {
  const handleNoButtonClick = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={cn("modal")}>
      <div className={cn("textWrap")}>
        <Image src={Check} alt="경고" width={24} height={24} />
        <p className={cn("text")}>{text}</p>
      </div>
      <div className={cn("buttonPosition")}>
        <Button text="아니오" size="yesOrNoModal" color="secondary" handleButtonClick={handleNoButtonClick} />
        <Button text={yesButtonText} size="yesOrNoModal" color="primary" handleButtonClick={handleYesButtonClick} />
      </div>
    </div>
  );
}
