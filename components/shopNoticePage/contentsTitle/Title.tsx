type Props = {
  title: string;
  className: string;
};

export default function Title({ title, className }: Props) {
  return <h2 className={className}>{title}</h2>;
}
