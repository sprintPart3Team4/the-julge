type Props = {
  shopDescription: string;
  className: string;
};

export default function ShopDescription({ shopDescription, className }: Props) {
  return <p className={className}>{shopDescription}</p>;
}
