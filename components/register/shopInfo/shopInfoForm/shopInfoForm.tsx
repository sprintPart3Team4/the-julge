import Input from "@/components/register/shopInfo/shopInfoForm/Input";
import SelectBox from "@/components/register/shopInfo/shopInfoForm/SelectBox";
import Textarea from "@/components/register/shopInfo/shopInfoForm/Textarea";
import FileInput from "@/components/register/shopInfo/shopInfoForm/FileInput";
import TextInput from "@/components/register/shopInfo/shopInfoForm/TextInput";
import { FOOD_CATEGORY, ADDRESS } from "@/components/register/shopInfo/shopInfoForm/constants";
import classNames from "classnames/bind";
import styles from "@/components/register/shopInfo/shopInfoForm/ShopInfoForm.module.scss";

const cn = classNames.bind(styles);

export default function ShopInfoForm() {
  return (
    <div className={cn("container")}>
      <form>
        <div className={cn("inputWrap")}>
          <Input
            for="shopName"
            title="가게 이름"
            input={{
              type: "text",
              id: "shopName",
              name: "shopName",
            }}
          />
          <SelectBox title="분류*" item={FOOD_CATEGORY} />
          <SelectBox title="주소*" item={ADDRESS} />
          <Input
            for="detailAddress"
            title="상세 주소"
            input={{
              type: "text",
              id: "detailAddress",
              name: "detailAddress",
            }}
          />
          <TextInput
            for="wage"
            title="기본 시급"
            text="원"
            input={{
              type: "text",
              id: "wage",
              name: "wage",
            }}
          />
        </div>
        <FileInput />
        <Textarea
          for="desc"
          title="가게 설명"
          textarea={{
            id: "desc",
            name: "desc",
          }}
        />
      </form>
    </div>
  );
}
