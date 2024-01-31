import { useRouter } from "next/router";
import classNames from "classnames/bind";

import Button from "../../button/Button";

import styles from "./ConfirmModal.module.scss";

const cn = classNames.bind(styles);

type Props = {
  text: string;
  url: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConfirmModal({ text, url, setIsModalOpen }: Props) {
  const router = useRouter();

  const handleButtonClick = () => {
    setIsModalOpen(false);
    router.push(url);
  };

  return (
    <div className={cn("modal")}>
      <p className={cn("text")}>{text}</p>
      <div className={cn("buttonPosition")}>
        <Button text="확인" size="checkModal" color="primary" handleButtonClick={handleButtonClick} />
      </div>
    </div>
  );
}
