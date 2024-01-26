import classNames from "classnames/bind";
import Image from "next/image";
import { storeInfo } from "@/pages/api/mockdata";
import TestImage from "@/public/images/shop-sample.png";
import LocationIcon from "@/public/images/location.svg";
import styles from "./MyShopProfile.module.scss";

const cn = classNames.bind(styles);

export default function MyShopProfile() {
  return (
    <div className={cn("container")}>
      <Image src={TestImage} className={cn("image")} alt="테스트 이미지" width={538} />
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
          <button className={cn("button", "whiteButton")}>편집하기</button>
          <button className={cn("button", "primaryButton")}>공고 등록하기</button>
        </div>
      </div>
    </div>
  );
}
