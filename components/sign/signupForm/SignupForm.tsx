import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SignupForm.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import EyeOn from "@/public/images/ico-eye-on.svg";
import EyeOff from "@/public/images/ico-eye-off.svg";

const cn = classNames.bind(styles);

export interface FormValue {
  email: string;
  password: string;
  passwordConfirm?: string;
  type?: "employee" | "employer";
}

export default function SignupForm() {
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
      type: "employee",
    },
  });

  const userInfo = {
    email: watch("email"),
    password: watch("password"),
    type: watch("type"),
  };

  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [togglePasswordCheck, setTogglePasswordCheck] = useState<boolean>(false);
  const handleClickTogglePassword = () => setTogglePassword((prev) => !prev);
  const handleClickTogglePasswordCheck = () => setTogglePasswordCheck((prev) => !prev);

  const source = togglePasswordCheck ? EyeOn : EyeOff;

  return (
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
              required: true,
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
              required: true,
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
              handleClickTogglePasswordCheck();
            }}
          >
            <Image src={source} alt="비밀번호 숨김 표시" width={16} height={16} />
          </button>
        </div>

        {errors.password && <small className={cn("errorMessage")}>{errors.password.message}</small>}
      </div>
      <div className={cn("inputWrap")}>
        <label htmlFor="confirmPassword" className={cn("inputLabel")}>
          비밀번호 확인
        </label>
        <div>
          <input
            className={cn("input")}
            id="confirmPassword"
            type={togglePassword ? "text" : "password"}
            placeholder="입력"
            {...register("passwordConfirm", {
              required: true,
              validate: {
                check: (value) => {
                  if (getValues("password") !== value) {
                    return "비밀번호가 일치하지 않습니다";
                  }
                },
              },
            })}
          />
          <button
            type="button"
            onClick={() => {
              handleClickTogglePassword();
              handleClickTogglePasswordCheck();
            }}
          >
            <Image src={source} alt="비밀번호 숨김 표시" width={16} height={16} />
          </button>
        </div>
        {errors.passwordConfirm && <small className={cn("errorMessage")}>{errors.passwordConfirm.message}</small>}
      </div>

      <button className={cn("signBtn")} type="submit" disabled={isSubmitting}>
        회원가입하기
      </button>
      {/* <SignButton text="로그인 하기" /> */}
    </form>
  );
}
