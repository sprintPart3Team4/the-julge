import classNames from "classnames/bind";
import css from "./NoticeCard.module.scss";
import TestImage from "@/public/images/shop-sample.png";
import Image from "next/image";
import { storeInfo, noticeList } from "@/pages/api/mockdata";
import TimeIcon from "@/public/images/clock.svg";
import LocationIcon from "@/public/images/location.svg";

const cn = classNames.bind(css);

function NoticeCard() {
  return (
    <div className={cn("container")}>
      <Image className={cn("image")} src={TestImage} alt="테스트 이미지" width={280}></Image>
      <div className={cn("contents")}>
        <span className={cn("shop-name")}>{storeInfo.item.name}</span>
        <div className={cn("time")}>
          <Image src={TimeIcon} alt="시계 아이콘" width={20} />
          <span>
            {noticeList.items[0].item.startsAt} ({noticeList.items[0].item.workhour}시간)
          </span>
        </div>
        <div className={cn("location")}>
          <Image src={LocationIcon} alt="장소 아이콘" width={20} />
          <span>{storeInfo.item.address1}</span>
        </div>
        <span className={cn("pay")}>{noticeList.items[0].item.hourlyPay.toLocaleString()}원</span>
      </div>
    </div>
  );
}

export default NoticeCard;
