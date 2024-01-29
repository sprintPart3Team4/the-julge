import { MouseEventHandler } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cn = classNames.bind(styles);

type Props = {
  text: string;
  size: "flexible" | "fixed" | "reactive" | "checkModal" | "yesOrNoModal";
  color: "primary" | "secondary" | "disabled";
  handleButtonClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ text, size, color, handleButtonClick }: Props) {
  return (
    <button className={cn("button", size, color)} onClick={handleButtonClick} disabled={color === "disabled"}>
      {text}
    </button>
  );
}
