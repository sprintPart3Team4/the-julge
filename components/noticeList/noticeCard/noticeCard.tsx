import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import HighPayRateBadge from "@/components/shopNoticePage/highPayRateBadge/HighPayRateBadge";
import LocationIcon from "@/public/images/location.svg";
import GreyLocationIcon from "@/public/images/location_grey.svg";
import ClockIcon from "@/public/images/clock.svg";
import GreyClockIcon from "@/public/images/clock_grey.svg";
import { useAuth } from "@/contexts/AuthProvider";
import { getFullDate } from "@/lib/getFullDate";
import { NoticeItem, Shop } from "@/types/noticesType";
import instance from "@/lib/axiosInstance";
import styles from "./NoticeCard.module.scss";

const cn = classNames.bind(styles);

type Props = {
  id: string;
  startsAt: string;
  workhour: number;
  hourlyPay: number;
  closed?: boolean;
  shop: {
    item: Shop;
    href: string;
  };
};

export default function NoticeCard({ id, startsAt, workhour, hourlyPay, closed = false, shop }: Props) {
  const [href, setHref] = useState<string>("");
  const { user } = useAuth();
  const noticeId = id;
  const shopId = user?.shop?.id;

  const getNoticeList = async (): Promise<NoticeItem[]> => {
    const res = await instance.get(`shops/${shopId}/notices`);
    return res.data.items;
  };

  useEffect(() => {
    if (!user) {
      setHref(`detail/${noticeId}`); // 로그인 하지 않은 유저
    } else if (shopId) {
      getNoticeList().then((res) => {
        if (res.some((notice) => notice.item.id === noticeId))
          setHref(`shop/${noticeId}`); // 가게 등록을 한 사장님 자신의 공고일 때
        else setHref(`detail/${noticeId}`); // 가게 등록을 했지만 자신의 공고가 아닐 때
      });
    } else {
      setHref(`detail/${noticeId}`);
    } // 일반 유저 or 가게 등록을 하지 않은 사장님
  });

  return (
    <Link href={href}>
      <div className={cn("wrap", { closed })}>
        <div className={cn("imageWidth")}>
          <div className={cn("imageHeight")}>
            {closed && <div className={cn("imgOverlay")}>마감 완료</div>}
            <Image className={cn("image")} src={shop.item.imageUrl} alt="가게 이미지" fill />
          </div>
        </div>
        <div className={cn("contents")}>
          <span className={cn("shopName")}>{shop.item.name}</span>
          <div className={cn("time")}>
            <Image src={closed ? GreyClockIcon : ClockIcon} alt="시계 아이콘" width={20} height={20} />
            <span>{getFullDate(startsAt, workhour)}</span>
          </div>
          <div className={cn("location")}>
            <Image src={closed ? GreyLocationIcon : LocationIcon} alt="장소 아이콘" width={20} height={20} />
            <span>{shop.item.address1}</span>
          </div>
          <div className={cn("pays")}>
            <span className={cn("pay")}>{hourlyPay.toLocaleString("ko-KR")}원</span>
            <HighPayRateBadge
              isListedCard
              closed={closed}
              hourlyPay={hourlyPay}
              originalHourlyPay={shop.item.originalHourlyPay || 0}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
