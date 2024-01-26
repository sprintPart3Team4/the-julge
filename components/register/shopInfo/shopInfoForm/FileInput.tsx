import Image from "next/image";
import CarmeraIcon from "@/public/images/camera.svg";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/shopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function FileInput() {
  return (
    <div className={cn("inputBox", "file")}>
      <p className={cn("title")}>가게 이미지</p>
      <div className={cn("wrap")}>
        <label htmlFor="file" className={cn("label")}>
          <div className={cn("cameraImage")}>
            <Image fill src={CarmeraIcon} alt="카메라 아이콘" object-fit="cover" />
          </div>
          이미지 추가하기
        </label>
      </div>
      <input type="file" id="file" name="file" />
    </div>
  );
}
