import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./CloseButton.module.scss";

const cn = classNames.bind(styles);

interface Props {
  stateToggle: (setIsRegisterOpen: boolean)=> void;
}

export default function CloseButton({ stateToggle }: Props) {

  function judgeRender() {
    stateToggle(false);
  }

  return (
    <div className={cn("closeButton")} onClick={judgeRender}>
      <Image
        src="/images/close.svg"
        alt="closeButton"
        width={32}
        height={32}
      />
    </div>
  );
}