import classNames from "classnames/bind";
import Button from "@/components/common/button/Button";
import { BUTTON_TYPE, MESSAGE_TYPE } from "./constant";
import styles from "./RegisterSuggestion.module.scss";

const cn = classNames.bind(styles);

type RegisterSuggestionProps = {
  type: "shop" | "notice";
};

export default function RegisterSuggestion({ type }: RegisterSuggestionProps) {
  return (
    <div className={cn("wrap")}>
      <span>{MESSAGE_TYPE[type]}</span>
      <Button text={BUTTON_TYPE[type]} size="reactive" color="primary" />
    </div>
  );
}
