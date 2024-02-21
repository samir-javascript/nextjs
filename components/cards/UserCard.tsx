import { getTopInteractedTags } from "@/lib/actions/tags.actions";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import RenderTags from "../shared/RenderTags";

interface props {
     user : {
        name: string;
        picture: string;
        _id: string;
        clerkId: string;
        username: string;
     }
}

const UserCard = async ({user}:props) => {
    const topInteractedTags = await getTopInteractedTags({userId: user._id})
    console.log('INTERACTED TAGS', topInteractedTags)
  return (
    <Link href={`/profile/${user.clerkId}`} 
    className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]  "
    >
        <article className="flex flex-col items-center justify-center
         p-8 w-full rounded-2xl background-light900_dark200 border light-border ">
             <Image alt='user profile picture' src={user.picture} 
             width={100} height={100} className="rounded-full" /> 
             <div className="mt-4 text-center">
                <h3 className="h3-bold line-clamp-1 text-dark200_light900 ">{user.name} </h3>
                <p className="mt-2 body-regular text-dark500_light500">@{user.username} </p>
             </div> 
             <div className="mt-5">

                 {topInteractedTags?.tags?.tags.length > 0 && topInteractedTags.tags !== undefined ? (
                     <div className="flex items-center gap-2">
                          {topInteractedTags?.tags.tags.map((tag:any) => (
                             <RenderTags _id={tag._id} name={tag.name} key={tag._id} />
                          ))}
                     </div>
                 ) : (
                    <Badge>
                         No tags yet
                    </Badge>
                 )}
             </div>
        </article>
    </Link>
  )
}

export default UserCard