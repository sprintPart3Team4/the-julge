import classNames from "classnames/bind";
import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";
import Button from "@/components/common/button/Button";
import LocationIcon from "@/public/images/location.svg";
import styles from "./MyShopProfile.module.scss";

const cn = classNames.bind(styles);

export default function MyShopProfile() {
  // const { shop } = useAuth();
  // 로그인 기능 만들어지기 전 임시로 만들어놓은 데이터
  const shop = {
    id: "2fd3b8d8-cda3-4e83-a6ff-b6d177437a2b",
    name: "더줄게",
    category: "한식",
    address1: "서울시 도봉구",
    address2: "쌍문동",
    description: "막퍼줄게 정말로 진짜진짜로 시급도 간식도 주휴수당도 전부전부",
    imageUrl: "https://picsum.photos/200/300",
    originalHourlyPay: 9860,
    user: {
      item: {
        id: "d8ec5811-0da2-4caa-8ac6-d09de8ae4b25",
        email: "thejulge@codeit.com",
        type: "employer",
      },
      href: "/api/2-4/the-julge/users/d8ec5811-0da2-4caa-8ac6-d09de8ae4b25",
    },
  };

  if (!shop) return;
  const { imageUrl, name, address1, originalHourlyPay } = shop;

  return (
    <div className={cn("wrap")}>
      <div className={cn("imageWidth")}>
        <div className={cn("imageHeight")}>
          <Image src={shop.imageUrl} className={cn("image")} alt="테스트 이미지" fill />
        </div>
      </div>
      <div className={cn("contents")}>
        <div className={cn("shopInfo")}>
          <span className={cn("category")}>{shop.category}</span>
          <span className={cn("name")}>{shop.name}</span>
          <div className={cn("location")}>
            <Image src={LocationIcon} alt="위치 아이콘" width={20} height={20} />
            <span>{shop.address1}</span>
          </div>
          <span className={cn("description")}>
            {shop.description.split("\n").map((el) => (
              <>
                <span>{el}</span>
                <br />
              </>
            ))}
          </span>
        </div>
        <div className={cn("buttons")}>
          <Button text="편집하기" size="flexible" color="secondary"></Button>
          <Button text="공고 등록하기" size="flexible" color="primary"></Button>
        </div>
      </div>
    </div>
  );
}
