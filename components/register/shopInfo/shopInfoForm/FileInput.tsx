import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { createPresinedURL } from "./api";
import { FileInput } from "./type";
import CarmeraIcon from "@/public/images/camera.svg";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function FileInput({ setFormValues, value }: FileInput) {
  const [preview, setPreview] = useState<string>(CarmeraIcon);
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isChange, setIsChange] = useState<boolean>(false);

  const isAddImage = fileValue ? "active" : "";
  const isDefaultImage = value && !fileValue ? "edit" : "";
  const alt = preview ? fileName : "카메라 아이콘";
  const imageButton = value ? "이미지 변경하기" : "이미지 등록하기";

  const getImgUrl = async (file: File) => {
    const imgUrl = await createPresinedURL(file);
    return imgUrl.split("?")[0];
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let file;

    if (target.files && target.files.length > 0) {
      file = target.files[0];
      const name = file.name.slice(0, file.name.indexOf("."));
      const imgUrl = await getImgUrl(file);

      setFileValue(file);
      setFileName(name);

      setFormValues((prev) => ({
        ...prev,
        imageUrl: imgUrl,
      }));
      setIsChange(true);
    }
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
        <div className={cn("wrap", { active: isAddImage, edit: isDefaultImage })}>
          <label htmlFor="file" className={cn("label")}>
            <div className={cn("ImageBox")}>
              {isChange || !value ? (
                <Image fill src={preview} alt={alt} object-fit="cover" />
              ) : (
                <>
                  <Image fill src={value} alt={alt} object-fit="cover" />
                </>
              )}
            </div>
            <span>{imageButton}</span>
          </label>
        </div>
        <input type="file" id="file" name="file" onChange={handleImageChange} />
      </div>
    </>
  );
}
