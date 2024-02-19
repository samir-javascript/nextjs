import Question from "@/components/form/Question";
import { redirect } from 'next/navigation'
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";

async function page() {

const { userId } = auth()
 
  if(!userId) redirect('/sign-in')
  const mongoUser = await getUserById({userId})

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 capitalize">
        ask a question
      </h1>
      <div className="mt-10">
        <Question mongoUserId={mongoUser?._id} />
      </div>
    </>
  );
}

export default page;