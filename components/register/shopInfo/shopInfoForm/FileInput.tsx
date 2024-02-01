import { useState, useEffect, ChangeEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { createPresinedURL } from "./api";
import { FormValues } from "./type";
import CarmeraIcon from "@/public/images/camera.svg";
import classNames from "classnames/bind";
import styles from "./ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function FileInput({
  setFormValues,
  id,
  defaultValue,
}: {
  setFormValues: Dispatch<SetStateAction<FormValues>>;
}) {
  const [preview, setPreview] = useState<string>(CarmeraIcon);
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const isAddImage = fileValue ? "active" : "";
  const alt = preview ? fileName : "카메라 아이콘";
  const imageChange = id ? "edit" : "";

  const getImgUrl = async (file: File) => {
    const imgUrl = await createPresinedURL(file);
    return imgUrl.split("?")[0];
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let file;

    if (target.files) {
      file = target.files[0];
      const name = file.name.slice(0, file.name.indexOf("."));
      const imgUrl = await getImgUrl(file);

      setFileValue(file);
      setFileName(name);

      setFormValues((prev) => ({
        ...prev,
        imageUrl: imgUrl,
      }));
    }
  };

  console.log(defaultValue);

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
        <div className={cn("wrap", isAddImage, imageChange)}>
          <label htmlFor="file" className={cn("label")}>
            <div className={cn("cameraImage")}>
              {/* {id ? (
                <Image fill src={d} alt={defaultValue} object-fit="cover" />
              ) : (
                <Image fill src={preview} alt={alt} object-fit="cover" />
              )} */}
                  <Image fill src={preview} alt={alt} object-fit="cover" />
            </div>
            <span>이미지 추가하기</span>
          </label>
        </div>
        <input type="file" id="file" name="file" onChange={handleImageChange} />
      </div>
    </>
  );
}
