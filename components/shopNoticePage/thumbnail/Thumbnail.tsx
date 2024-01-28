import Image from "next/image";
// UI 구현을 위해 임시적으로 사용하는 이미지를 위해 사용 중. api 연결 후 삭제 예정
import { StaticImport } from "next/dist/shared/lib/get-img-props";

import classNames from "classnames/bind";
import styles from "./Thumbnail.module.scss";

const cn = classNames.bind(styles);

type Props = {
  src: string | StaticImport;
  alt: string;
  isClosed?: boolean;
};

export default function Thumbnail({ src, alt, isClosed = false }: Props) {
  return (
    <div className={cn("container")}>
      {isClosed && <div className={cn("closed")}>마감 완료</div>}
      <Image className={cn("thumbnail")} src={src} alt={`${alt} 미리보기 이미지`} objectFit="cover" />
    </div>
  );
}
