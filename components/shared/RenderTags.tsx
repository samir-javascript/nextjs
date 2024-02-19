import { Badge } from "@/components/ui/badge";
import Link from "next/link";
interface props {
  name: string;
  totalQuestions?: number;
  _id: string;
  showCount?: boolean;
}
export default function RenderTags({
  name,
  totalQuestions,
  _id,
  showCount,
}: props) {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-3">
      <Badge
        className="subtle-medium
          background-light800_dark300 rounded-md border-none
          px-4 py-2 uppercase text-light400_light500
       "
      >
        {name}
      </Badge>
      {showCount && totalQuestions !== 0 && (
        <p className="text-light400_light500 small-medium">{totalQuestions}</p>
      )}
    </Link>
  );
}