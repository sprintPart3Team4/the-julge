import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { createPresinedURL } from "@/components/register/shopInfo/shopInfoForm/api";
import CarmeraIcon from "@/public/images/camera.svg";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/shopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function FileInput({ setFormValues }) {
  const [preview, setPreview] = useState<string>(CarmeraIcon);
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const isAddImage = fileValue ? "active" : "";
  const alt = preview ? fileName : "카메라 아이콘";

  const getImgUrl = async (file) => {
    const imgUrl = await createPresinedURL(file);
    return imgUrl.split("?")[0];
  };

  const handleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let file;

    if (target.files) {
      file = target.files[0];
      const name = file.name.slice(0, file.name.indexOf("."));

      setFileValue(file);
      setFileName(name);
    }
    const imgUrl = await getImgUrl(file);
    console.log(imgUrl)
    setFormValues((prev) => ({
      ...prev,
      imageUrl: imgUrl,
    }));
  };

  useEffect(() => {
    if (!fileValue) return;
    const nextPreview = URL.createObjectURL(fileValue);
    setPreview(nextPreview);

    return () => {
      setPreview("");
      URL.revokeObjectURL(nextPreview);
    };
  }, [fileValue]);

  return (
    <>
      <div className={cn("inputBox", "file")}>
        <p className={cn("title")}>가게 이미지</p>
        <div className={cn("wrap", isAddImage)}>
          <label htmlFor="file" className={cn("label")}>
            <div className={cn("cameraImage")}>
              <Image fill src={preview} alt={alt} object-fit="cover" />
            </div>
            이미지 추가하기
          </label>
        </div>
        <input type="file" id="file" name="file" onChange={handleImgChange} />
      </div>
    </>
  );
}
