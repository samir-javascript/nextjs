
import { redirect } from 'next/navigation'

import { auth } from "@clerk/nextjs";
import { getQuestionById } from "@/lib/actions/question.action";

import Question from '@/components/form/Question';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';

async function page({params}:ParamsProps) {

const { userId } = auth()
 
  if(!userId) redirect('/sign-in')
  const result = await getQuestionById({questionId:params.id })
  const mongoUser = await getUserById({userId})

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 capitalize">
        Edit  question
      </h1>
      <div className="mt-10">
        <Question  type='edit' mongoUserId={mongoUser?._id} questionDetails={JSON.stringify(result)} />
      </div>
    </div>
  );
}

export default page;