import classNames from "classnames/bind";
import Image from "next/image";
import Button from "@/components/common/button/Button";
import { userInfo } from "@/pages/api/userMockdata";
import LocationIcon from "@/public/images/location.svg";
import phoneIco from "@/public/images/phone.svg";
import styles from "./MyProfile.module.scss";
import { useAuth } from "@/contexts/AuthProvider";

const cn = classNames.bind(styles);

export default function MyProfile() {
  const { user } = useAuth();
  console.log(`유저정보 : ${user}`);
  console.log(user);

  if (!user) return;
  const { address, bio, phone, name } = user;

  return (
    <div className={cn("wrap")}>
      <div className={cn("contents")}>
        <div className={cn("userInfo")}>
          <span className={cn("title")}>이름</span>
          <span className={cn("name")}>{name}</span>
          <div className={cn("location")}>
            <Image src={phoneIco} alt="폰 아이콘" width={20} height={20} />
            <span>{phone}</span>
          </div>
          <div className={cn("location")}>
            <Image src={LocationIcon} alt="위치 아이콘" width={20} height={20} />
            <span>{address}</span>
          </div>
        </div>
        <div className={cn("userDes")}>
          <span className={cn("description")}>{bio}</span>
        </div>
      </div>
      <div className={cn("buttons")}>
        <Button text="편집하기" size="flexible" color="secondary"></Button>
      </div>
    </div>
  );
}
