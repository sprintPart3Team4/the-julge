import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./CloseButton.module.scss";

const cn = classNames.bind(styles);

export default function CloseButton({buttonClickEvent}: any) {


  return (
    <div className={cn("closeButton")} onClick={buttonClickEvent}>
      <Image
        src="/images/close.svg"
        alt="closeButton"
        width={32}
        height={32}
      />
    </div>
  );
}