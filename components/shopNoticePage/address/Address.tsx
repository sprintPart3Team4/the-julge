import Image from "next/image";
import classNames from "classnames/bind";

import LocationActive from "@/public/images/location.svg";
import LocationInactive from "@/public/images/location_grey.svg";

import styles from "./Address.module.scss";

const cn = classNames.bind(styles);

type Props = {
  address: string;
  isClosed?: boolean;
};

export default function Address({ address, isClosed = false }: Props) {
  const ImageSrc = isClosed ? LocationInactive : LocationActive;
  return (
    <div className={cn("address")}>
      <Image className={cn("icon")} src={ImageSrc} alt="위치를 나타내기 위한 아이콘" width={20} height={20} />
      {address}
    </div>
  );
}
