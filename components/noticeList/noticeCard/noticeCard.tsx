import React from "react";
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
import { Shop } from "@/types/noticesType";
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
  // const router = useRouter();
  const { user } = useAuth();
  const noticeId = id;

  // const handleClick = () => {
  //   // const { userId } = getCookies();
  //   // if(!userId) router.push('') // 로그인 안 되어 있을 시: 기본 공고 상세 페이지
  //   // else if (){ // 로그인 되어 있을 시
  //   //   router.push('')
  //   // }

  //   if (!user) router.push(`detail/${noticeId}`); // 로그인 안 되어 있을 시: 기본 공고 상세 페이지
  //   else if (user.type === "employer" /* && 내 공고이면 */)
  //     router.push(`shop/${noticeId}`); // 로그인 되어 있는데 - 사장님이고/내 공고라면: 내 가게/공고 상세 페이지
  //   else router.push(`detail/${noticeId}`); // 그 외의 경우: 기본 공고 상세 페이지
  // };

  let href;
  if (!user) href = `detail/${noticeId}`; // 로그인 안 되어 있을 시: 기본 공고 상세 페이지
  else if (user.type === "employer" /* && 내 공고이면 */)
    href = `shop/${noticeId}`; // 로그인 되어 있는데 - 사장님이고/내 공고라면: 내 가게/공고 상세 페이지
  else href = `detail/${noticeId}`; // 그 외의 경우: 기본 공고 상세 페이지

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
