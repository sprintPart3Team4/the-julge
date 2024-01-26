type Props = {
  shopName: string;
  className: string;
};

export default function Title({ shopName, className }: Props) {
  return <h2 className={className}>{shopName}</h2>;
}
