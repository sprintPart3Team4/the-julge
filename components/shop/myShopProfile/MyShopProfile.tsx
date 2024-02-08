import classNames from "classnames/bind";
import { useAuth } from "@/contexts/AuthProvider";
import Image from "next/image";
import Button from "@/components/common/button/Button";
import LocationIcon from "@/public/images/location.svg";
import styles from "./MyShopProfile.module.scss";

const cn = classNames.bind(styles);

type Prop = {
  toggleInfoOpen: () => void;
  toggleNoticeOpen: () => void;
};

export default function MyShopProfile({ toggleInfoOpen, toggleNoticeOpen }: Prop) {
  const { shop } = useAuth();

  if (!shop) return;
  const { imageUrl, name, category, address1, description } = shop;

  return (
    <div className={cn("wrap")}>
      <div className={cn("imageWidth")}>
        <div className={cn("imageHeight")}>
          <Image src={imageUrl} className={cn("image")} alt="테스트 이미지" fill />
        </div>
      </div>
      <div className={cn("contents")}>
        <div className={cn("shopInfo")}>
          <span className={cn("category")}>{category}</span>
          <span className={cn("name")}>{name}</span>
          <div className={cn("location")}>
            <Image src={LocationIcon} alt="위치 아이콘" width={20} height={20} />
            <span>{address1}</span>
          </div>
          <span className={cn("description")}>
            {description.split("\n").map((el) => (
              <>
                <span>{el}</span>
                <br />
              </>
            ))}
          </span>
        </div>
        <div className={cn("buttons")}>
          <Button text="편집하기" size="flexible" color="secondary" handleButtonClick={toggleInfoOpen}></Button>
          <Button text="공고 등록하기" size="flexible" color="primary" handleButtonClick={toggleNoticeOpen}></Button>
        </div>
      </div>
    </div>
  );
}
