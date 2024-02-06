import { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";

import AddressBadge from "../addressbadge/AddressBadge";

import { Filter } from "@/types/noticesType";

import styles from "./SelectedAddress.module.scss";

const cn = classNames.bind(styles);

type Props = {
  address: string[] | undefined;
  setFilter: Dispatch<SetStateAction<Filter>>;
};

export default function SelectedAddress({ address, setFilter }: Props) {
  return (
    <div className={cn("wrap")}>
      {address.map((add) => (
        <AddressBadge key={add} text={add} setFilter={setFilter} />
      ))}
    </div>
  );
}
