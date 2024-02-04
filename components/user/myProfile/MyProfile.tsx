import classNames from "classnames/bind";
import Image from "next/image";
import Button from "@/components/common/button/Button";
import { userInfo } from "@/pages/api/userMockdata";
import LocationIcon from "@/public/images/location.svg";
import phone from "@/public/images/phone.svg";
import styles from "./MyProfile.module.scss";

const cn = classNames.bind(styles);

export default function MyProfile() {
  return (
    <div className={cn("wrap")}>
      <div className={cn("contents")}>
        <div className={cn("userInfo")}>
          <span className={cn("title")}>이름</span>
          <span className={cn("name")}>{userInfo.item.name}</span>
          <div className={cn("location")}>
            <Image src={phone} alt="폰 아이콘" width={20} height={20} />
            <span>{userInfo.item.phone}</span>
          </div>
          <div className={cn("location")}>
            <Image src={LocationIcon} alt="위치 아이콘" width={20} height={20} />
            <span>{userInfo.item.address}</span>
          </div>
        </div>
        <div className={cn("userDes")}>
          <span className={cn("description")}>{userInfo.item.bio}</span>
        </div>
      </div>
      <div className={cn("buttons")}>
        <Button text="편집하기" size="flexible" color="secondary"></Button>
      </div>
    </div>
  );
}
