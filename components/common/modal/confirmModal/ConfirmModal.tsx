import { MouseEventHandler } from "react";
import classNames from "classnames/bind";

import Button from "../../button/Button";

import styles from "./ConfirmModal.module.scss";

const cn = classNames.bind(styles);

type Props = {
  text: string;
  handleButtonClick: MouseEventHandler<HTMLButtonElement>;
};

export default function ConfirmModal({ text, handleButtonClick }: Props) {
  return (
    <div className={cn("modal")}>
      <p className={cn("text")}>{text}</p>
      <div className={cn("buttonPosition")}>
        <Button text="확인" size="checkModal" color="primary" handleButtonClick={handleButtonClick} />
      </div>
    </div>
  );
}
