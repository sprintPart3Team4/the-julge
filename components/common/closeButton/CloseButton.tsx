import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./CloseButton.module.scss";

const cn = classNames.bind(styles);

interface Prop {
  buttonClickEvent: () => void;
}

export default function CloseButton({ buttonClickEvent }: Prop) {
  return (
    <div className={cn("closeButton")} onClick={buttonClickEvent}>
      <Image src="/images/close.svg" alt="closeButton" width={32} height={32} />
    </div>
  );
}
