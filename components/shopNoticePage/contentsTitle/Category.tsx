type Props = {
  category: "한식" | "중식" | "일식" | "양식" | "분식" | "카페" | "편의점" | "기타";
  className: string;
};

export default function Category({ category, className }: Props) {
  return <small className={className}>{category}</small>;
}
