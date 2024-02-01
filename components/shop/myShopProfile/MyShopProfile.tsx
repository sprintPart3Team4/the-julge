import classNames from "classnames/bind";
import Image from "next/image";
import Button from "@/components/common/button/Button";
import { storeInfo } from "@/pages/api/mockdata";
import TestImage from "@/public/images/shop-sample.png";
import LocationIcon from "@/public/images/location.svg";
import styles from "./MyShopProfile.module.scss";

const cn = classNames.bind(styles);

type Prop = {
  setIsRegisterOpen: () => void;
};

export default function MyShopProfile({ setIsRegisterOpen }: Prop) {
  return (
    <div className={cn("wrap")}>
      <Image src={TestImage} className={cn("image")} alt="테스트 이미지" objectFit="cover" />
      <div className={cn("contents")}>
        <div className={cn("shopInfo")}>
          <span className={cn("category")}>{storeInfo.item.category}</span>
          <span className={cn("name")}>{storeInfo.item.name}</span>
          <div className={cn("location")}>
            <Image src={LocationIcon} alt="위치 아이콘" width={20} height={20} />
            <span>{storeInfo.item.address1}</span>
          </div>
          <span className={cn("description")}>
            {storeInfo.item.description.split("\n").map((el) => (
              <>
                <span>{el}</span>
                <br />
              </>
            ))}
          </span>
        </div>
        <div className={cn("buttons")}>
          <Button text="편집하기" size="flexible" color="secondary"></Button>
          <Button text="공고 등록하기" size="flexible" color="primary" handleButtonClick={setIsRegisterOpen}></Button>
        </div>
      </div>
    </div>
  );
}
