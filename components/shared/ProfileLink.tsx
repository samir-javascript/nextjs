import Image from "next/image";
import Link from "next/link";

interface ProfileLinkProps {
     imgUrl: string;
     title: string;
     href?: string;
}

const ProfileLink = ({imgUrl, title, href}:ProfileLinkProps) => {
  return (
    <div className="flex items-center gap-1">
         <Image src={imgUrl} alt='icon' width={20} height={20} />
         {href ? (
            <Link className="paragraph-medium text-accent-blue"  target="_blank" href={href}>
               {title}
            </Link>
         ): (
             <p className="paragraph-medium text-dark400_light700">
                 {title}
             </p>
         )}
    </div>
  )
}

export default ProfileLink