import { useRouter } from "next/router";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./CloseButton.module.scss";

const cn = classNames.bind(styles);

interface Props {
  url: string;
}

export default function CloseButton({ url }: Props) {
  const router = useRouter();

  function pageMovement(): void {
    router.push(`${url}`);
  }

  return (
    <div className={cn("closeButton")} onClick={pageMovement}>
      <Image
        src="/images/close.svg"
        alt="closeButton"
        width={32}
        height={32}
      />
    </div>
  );
}