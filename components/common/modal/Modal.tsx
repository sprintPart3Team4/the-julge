import React, { ReactNode } from "react";
import classNames from "classnames/bind";
import ConfirmModal from "./confirmModal/ConfirmModal";
import WarningModal from "./warningModal/WarningModal";
import YesOrNoModal from "./yesOrNoModal/YesOrNoModal";

import styles from "./Modal.module.scss";

const cn = classNames.bind(styles);

type Props = {
  children: ReactNode;
};

export default function Modal({ children }: Props) {
  return <div className={cn("background")}>{children}</div>;
}

Modal.Confirm = ConfirmModal;
Modal.Warning = WarningModal;
Modal.YesOrNo = YesOrNoModal;
