import classNames from "classnames/bind";
import styles from "./StatusButton.module.scss";
import { useState } from "react";
import Modal from "@/components/common/modal/Modal";
import { useRouter } from "next/router";
import getCookies from "@/lib/getCookies";
import instance from "@/lib/axiosInstance";

const cn = classNames.bind(styles);

type Props = {
  status: "accepted" | "rejected";
  text: "승인하기" | "거절하기";
  applicationId: string;
};

export default function StatusButton({ status, text, applicationId }: Props) {
  const router = useRouter();
  const { noticeId } = router.query;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalText = text === "승인하기" ? "신청을 승인하시겠어요?" : "신청을 거절하시겠어요?";

  if (typeof noticeId !== "string") {
    return;
  }

  const handleModalOpen = () => setIsModalOpen(true);

  const handleChangeStatus = () => {
    changeStatus(noticeId, applicationId, status);
    setIsModalOpen(false);
    // 일단 리로드 함수를 썼는데... 다른 방법이 있나 나중에 찾아봐야 함..
    router.reload();
  };

  return (
    <div>
      <button className={cn("button", status)} onClick={handleModalOpen}>
        {text}
      </button>
      {isModalOpen && (
        <Modal>
          <Modal.YesOrNo
            text={modalText}
            yesButtonText={text}
            setIsModalOpen={setIsModalOpen}
            handleYesButtonClick={handleChangeStatus}
          />
        </Modal>
      )}
    </div>
  );
}

const changeStatus = async (noticeId: string, applicationId: string, status: "accepted" | "rejected") => {
  const { shopId, token } = getCookies();

  await instance.put(
    `shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
    {
      status: status,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
