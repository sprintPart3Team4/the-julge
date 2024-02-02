import React from "react";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import axios from "@/pages/api/axios";
import Logo from "@/components/common/logo/Logo";
import Button from "@/components/common/button/Button";
import SignBottom from "@/components/sign/signBotton/SignBotton";
import Modal from "@/components/common/modal/Modal";

import Image from "next/image";
import EyeOn from "@/public/images/ico-eye-on.svg";
import EyeOff from "@/public/images/ico-eye-off.svg";
import uncheckedButton from "@/public/images/unCheck.svg";
import checkedButton from "@/public/images/check.svg";

import styles from "./SignupForm.module.scss";

const cn = classNames.bind(styles);

export interface FormValue {
  email: string;
  password: string;
  passwordConfirm?: string;
  type?: "employee" | "employer";
}

export default function SignupForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const openModal = (type: string) => {
    setIsError(type === "error");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    isError ? router.push("/signup") : router.push("/signin");
  };

  async function onSubmit(data: FormValue) {
    try {
      const { email, password, type } = data;
      await axios.post("users", {
        email,
        password,
        type,
      });
      openModal("success");
    } catch (error) {
      openModal("error");
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
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
            <small className={cn("errorMessage")}>{errors.email?.message}</small>
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
            <small className={cn("errorMessage")}>{errors.password?.message}</small>
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
                  required: "비밀번호를 입력해주세요.",
                  validate: {
                    check: (value) => {
                      if (userInfo.password !== value) {
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
                }}
              >
                <Image src={source} alt="비밀번호 숨김 표시" width={16} height={16} />
              </button>
            </div>
            <small className={cn("errorMessage")}>{errors.passwordConfirm?.message}</small>
          </div>
          <div className={cn("userTypeWrap")}>
            <div className={cn("userType")}>회원 유형</div>
            <div className={cn("userTypeRadioBox")}>
              <div className={cn("userTypeRadioBoxs")}>
                <input
                  type="radio"
                  value="employee"
                  id="employee"
                  checked={userInfo.type === "employee"}
                  {...register("type")}
                />
                <label htmlFor="employee">
                  <Image
                    src={userInfo.type === "employee" ? checkedButton : uncheckedButton}
                    alt="체크이미지"
                    width={20}
                    height={20}
                  />
                  <span>알바님</span>
                </label>
              </div>
              <div className={cn("userTypeRadioBoxs")}>
                <input
                  type="radio"
                  value="employer"
                  id="employer"
                  checked={userInfo.type === "employer"}
                  {...register("type")}
                />
                <label htmlFor="employer">
                  <Image
                    src={userInfo.type === "employer" ? checkedButton : uncheckedButton}
                    alt="체크이미지"
                    width={20}
                    height={20}
                  />
                  <span>사장님</span>
                </label>
              </div>
            </div>
          </div>
          <div className={cn("buttonWrap")}>
            <Button text="회원가입 하기" size="fixed" color="primary" />
          </div>
        </form>
        <div className={cn("signBottomWrap")}>
          <SignBottom text="이미 가입하셨나요?" href="/signin" textLink="로그인하기" />
        </div>
      </div>
      {isModalOpen && (
        <Modal>
          <Modal.Confirm
            text={isError ? "이미 사용 중인 이메일입니다." : "가입이 완료되었습니다!"}
            handleButtonClick={closeModal}
          />
        </Modal>
      )}
    </div>
  );
}
