import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";

import { Filter } from "@/types/noticesType";

import Close from "@/public/images/close_red.svg";

import styles from "./AddressBadge.module.scss";

const cn = classNames.bind(styles);

type Props = {
  text: string;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export default function AddressBadge({ text, setFilter }: Props) {
  const handleDeleteAddress = (e) => {
    setFilter((prev) => ({ ...prev, address: prev.address?.filter((value) => value !== e.target.value) }));
  };

  return (
    <button className={cn("button")} value={text} onClick={(e) => handleDeleteAddress(e)}>
      {text}
      <Image className={cn("closeIcon")} src={Close} alt="닫기" width={16} height={16} />
    </button>
  );
}
