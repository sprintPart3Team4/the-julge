import classNames from "classnames/bind";
import styles from "./StatusButton.module.scss";
import { useState } from "react";

const cn = classNames.bind(styles);

type Props = {
  status: "accepted" | "rejected";
  text: "승인하기" | "거절하기";
};

export default function StatusButton({ status, text }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  return (
    <div>
      <button className={cn("button", status)} onClick={handleModalOpen}>
        {text}
      </button>
      {/* todo: 모달 만든 후, 버튼을 누르면 모달이 열리고 -> 모달에서 네/아니오 버튼을 누르면 해당 status로 변경되도록 구현 */}
      {isModalOpen && <div>{isModalOpen}</div>}
    </div>
  );
}
