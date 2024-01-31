import React from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import axios from "@/pages/api/axios";

import styles from "./SigninForm.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import uncheckedButton from "@/public/images/unCheck.svg";
import checkedButton from "@/public/images/check.svg";
import EyeOn from "@/public/images/ico-eye-on.svg";
import EyeOff from "@/public/images/ico-eye-off.svg";
import Logo from "@/components/common/logo/Logo";
import Button from "@/components/common/button/Button";
import SignBottom from "@/components/sign/signBotton/SignBotton";

const cn = classNames.bind(styles);

export interface FormValue {
  email: string;
  password: string;
  passwordConfirm?: string;
  type?: "employee" | "employer";
}

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    watch,
  } = useForm<FormValue>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const userInfo = {
    email: watch("email"),
    password: watch("password"),
  };

  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [togglePasswordCheck, setTogglePasswordCheck] = useState<boolean>(false);
  const handleClickTogglePassword = () => {
    setTogglePassword((prev) => !prev);
    setTogglePasswordCheck((prev) => !prev);
  };

  const source = togglePasswordCheck ? EyeOn : EyeOff;

  return (
    <div className={cn("signLayoutWrap")}>
      <div className={cn("signWrap")}>
        <div className={cn("logoWarp")}>
          <Logo size="large" />
        </div>
        <form onSubmit={handleSubmit(() => onSubmit(userInfo))} className={cn("formWrap")}>
          <div className={cn("inputWrap")}>
            <label htmlFor="email" className={cn("inputLabel")}>
              이메일
            </label>
            <div>
              <input
                className={cn("input")}
                id="email"
                type="text"
                placeholder="입력"
                {...register("email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                })}
              />
            </div>
            {errors.email && <small className={cn("errorMessage")}>{errors.email.message}</small>}
          </div>
          <div className={cn("inputWrap")}>
            <label htmlFor="password" className={cn("inputLabel")}>
              비밀번호
            </label>
            <div>
              <input
                className={cn("input")}
                id="password"
                type={togglePassword ? "text" : "password"}
                placeholder="입력"
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "8자 이상 입력해주세요.",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleClickTogglePassword();
                }}
              >
                <Image src={source} alt="비밀번호 숨김 표시" width={16} height={16} />
              </button>
            </div>

            {errors.password && <small className={cn("errorMessage")}>{errors.password.message}</small>}
          </div>
          <div className={cn("buttonWrap")}>
            <Button text="로그인 하기" size="fixed" color="primary" type="submit" />
          </div>
        </form>
        <div className={cn("signBottomWrap")}>
          <SignBottom text="회원이 아니신가요?" href="/signup" textLink="회원가입하기" />
        </div>
      </div>
    </div>
  );
}
