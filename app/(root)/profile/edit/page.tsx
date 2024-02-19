import { redirect } from 'next/navigation'
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import ProfileForm from "@/components/form/ProfileForm";

async function page() {

 const { userId } = auth()
 
  if(!userId) redirect('/sign-in')
  const mongoUser = await getUserById({userId})


  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 capitalize">
       Edit Profile
      </h1>
      <div className="mt-10">
        <ProfileForm user={JSON.stringify(mongoUser)} clerkId={userId} />
      </div>
    </div>
  );
}

export default page;