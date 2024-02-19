import AllAnswers from "@/components/AllAnswers";
import Answer from "@/components/form/Answer";

import ParseHtml from "@/components/shared/ParseHtml";
import RenderTags from "@/components/shared/RenderTags";
import Votes from "@/components/shared/Votes";

import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";

import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


interface Props {
  params: {
    id: string;
  };
  searchParams: {
     page: number;
     filter: string;
  }
}

export async function generateMetadata({ params }:Props) {
const result = await getQuestionById({ questionId: params.id });
  return {
    title: ` Devflow | ${result.title}`,
    description: result.content,
  }
}

const page = async ({ params, searchParams }: Props) => {
  const result = await getQuestionById({ questionId: params.id });
  const { userId: clerkId } = auth();
  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
  }

  // Update metadata dynamically based on the question content
  

  return (
    <>
      <div className="flex flex-start flex-col">
        <div className="flex w-full justify-between sm:flex-row flex-col-reverse gap-5 sm:gap-2 sm:items-center">
          <Link className="flex items-center justify-start gap-1" href={`/profile/${result.author.clerkId}`}>
            <Image src={result.author.picture} alt="profile" width={22} height={22} className="rounded-full" />
            <p className="paragraph-semibold text-dark300_light700 ">{result.author.name}</p>
          </Link>
          <div className="flex justify-end ">
            <Votes
              type="question"
              itemId={result._id}
              userId={mongoUser._id}
              upvotes={result.upvotes.length}
              downvotes={result.downvotes.length}
              hasSaved={mongoUser.saved.includes(result._id)}
              hasUpvoted={result.upvotes.includes(mongoUser._id)}
              hasDownvoted={result.downvotes.includes(mongoUser._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">{result.title} </h2>
      </div>

      <div className="flex flex-wrap gap-4 mt-5 mb-8">
        {/* ... (existing Metric components) */}
      </div>

      <ParseHtml data={result.content} />
      
      <div className="flex gap-4 mt-8 items-center flex-wrap">
        {result.tags.map((tag: any) => (
          <RenderTags key={tag._id} name={tag.name} _id={tag._id} showCount={false} />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        authorId={mongoUser._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />
      <Answer question={result.content} authorId={mongoUser._id} questionId={result._id} />
    </>
  );
};

export default page;
