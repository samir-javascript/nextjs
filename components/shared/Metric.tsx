import Image from "next/image";
import Link from "next/link";

interface metricProps {
  imgUrl: string;
  title: string;
  value: number | string;
  isAuthor?: boolean;
  href?: string;
  alt: string;
  textStyles?: string;
}

export default function Metric({
  imgUrl,
  title,
  value,
  alt,
  textStyles,
  isAuthor,
  href,
}: metricProps) {
  const matricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`object-contain ${href ? "rounded-full" : ""}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}{" "}
        <span
          className={`small-regular ${
            isAuthor ? "max-sm:hidden" : ""
          } line-clamp-1`}
        >
          {title}
        </span>
      </p>
    </>
  );
  if (href) {
    return (
      <Link className="flex gap-1" href={href}>
        {matricContent}
      </Link>
    );
  }
  return <div className="flex-center flex-wrap gap-1">{matricContent}</div>;
}
