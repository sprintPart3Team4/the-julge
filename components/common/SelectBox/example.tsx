import { useState } from "react";
import SelectBox from "./SelectBoxDropDown";
import { FormValues } from "@/components/register/shopInfo/shopInfoForm/type";
import { FOOD_CATEGORY } from "@/components/register/shopInfo/shopInfoForm/constants";

export default function SelectBox_example() {
  // 아래와 같이 객체 형태로 만들어 "선택"을 입력해줍니다.
  const initialFormValues = {
    name: "",
    category: "선택",
    address1: "선택",
    address2: "",
    description: "",
    imageUrl: "",
    originalHourlyPay: 0,
  };

  // FormValues는 제가 정의한 type.ts에서 가져온 타입으로 새롭게 타입만들어서 지정해주시면 됩니다.
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  // 현재 SelectBox 컴포넌트에 넘겨주어야하는 props을 적어주시면 됩니다
  /*
    label: 저는 위에서 정의한 객체의 이름을 넣었지만 title과 연관지어 알아서 넣어주세요
    title: 셀렉트박스 이름
    item: 선택할 수 있는 옵션 목록
    defaultValue: 위에서 정의한 객체의 "선택"이 들어있는 값
    setFormValues: 위에서 만든 state의 setter함수
  */
  return (
    <SelectBox
      label="address1"
      title="주소*"
      item={FOOD_CATEGORY}
      defaultValue={formValues.address1}
      setFormValues={setFormValues}
    />
  );
}
