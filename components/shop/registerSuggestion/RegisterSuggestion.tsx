import classNames from "classnames/bind";
import Link from "next/link";
import Button from "@/components/common/button/Button";
import { BUTTON_TYPE, MESSAGE_TYPE, LINK } from "./constant";
import styles from "./RegisterSuggestion.module.scss";

const cn = classNames.bind(styles);

type RegisterSuggestionProps = {
  type: "shop" | "notice" | "user" | "apply";
};

export default function RegisterSuggestion({ type }: RegisterSuggestionProps) {
  return (
    <div className={cn("wrap")}>
      <span>{MESSAGE_TYPE[type]}</span>
      <Link href={LINK[type]}>
        <Button text={BUTTON_TYPE[type]} size="reactive" color="primary" />
      </Link>
    </div>
  );
}
