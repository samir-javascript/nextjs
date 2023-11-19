import Question from "@/components/form/Question";
import { redirect } from 'next/navigation'
import { getUserById } from "@/lib/actions/user.action";

async function page() {

const userId = '123456'

  if(!userId) redirect('/sign-in')
  const mongoUser = await getUserById({userId})
console.log(mongoUser)
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 capitalize">
        ask a question
      </h1>
      <div className="mt-10">
        <Question mongoUserId={mongoUser._id} />
      </div>
    </div>
  );
}

export default page;