import React from "react";
import styles from "./Form.module.scss";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
// import SignButton from "../signButton/SignButton";

const cn = classNames.bind(styles);

interface FormValue {
  email: string;
  password: string;
  passwordConfirm: string;
}
const onSubmit = (data: FormValue) => {
  console.log(data);
};

export default function LoginForm({ email, password, passwordConfirm }: FormValue) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
  } = useForm<FormValue>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("formWrap")}>
      <div className={cn("inputWrap")}>
        <label htmlFor="email" className={cn("inputLabel")}>
          이메일
        </label>
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
        {errors.email && <small className={cn("errorMessage")}>{errors.email.message}</small>}
      </div>
      <div className={cn("inputWrap")}>
        <label htmlFor="password" className={cn("inputLabel")}>
          비밀번호
        </label>
        <input
          className={cn("input")}
          id="password"
          type="password"
          placeholder="입력"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "8자 이상 입력해주세요.",
            },
          })}
        />
        {errors.password && <small className={cn("errorMessage")}>{errors.password.message}</small>}
      </div>
      <div className={cn("inputWrap")}>
        <label htmlFor="confirmPassword" className={cn("inputLabel")}>
          비밀번호 확인
        </label>
        <input
          className={cn("input")}
          id="confirmPassword"
          type="password"
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
        {errors.passwordConfirm && <small className={cn("errorMessage")}>{errors.passwordConfirm.message}</small>}
      </div>
      <button className={cn("signBtn")} type="submit" disabled={isSubmitting}>
        로그인 하기
      </button>
      {/* <SignButton text="로그인 하기" /> */}
    </form>
  );
}
