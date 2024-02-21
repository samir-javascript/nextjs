"use client"
import { deleteAnswer } from "@/lib/actions/answer.actions";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname } from "next/navigation"
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
interface props {
    type: string;
    itemId: string;
}
const EditDeleteAction = ({type,itemId}:props) => {
  const { toast } = useToast()
    const router = useRouter()
    const pathname = usePathname()
    const handleDelete = async()=> {
          if(type === 'question') {
              try {
                 await deleteQuestion({
                     questionId: itemId,
                     path: pathname
                 })
                 return toast({
                  title: "Question deleted",
                  description:"your question has been successfuly deleted",
                 
                 })
              } catch (error) {
                 console.log(error ,"error while deleting question")
              }
          }else if(type === 'answer') {
            try {
                await deleteAnswer({
                    answerId: itemId,
                    path: pathname
                })
                return toast({
                  title: "Answer deleted",
                  description:"your answer has been successfuly deleted",
                 
                 })
             } catch (error) {
                console.log(error ,"error while deleting question")
             }
          }
    }
    const handleEdit = ()=> {
        router.push(`/question/edit/${itemId}`)
    }
  console.log(pathname)
  return (
    <div className="flex items-center gap-3 justify-end max-sm:w-full">
          {type === 'question' && (
             <Image 
              onClick={handleEdit}
                src='/assets/icons/edit.svg'
                alt='edit icon'
                height={18}
                width={18}
                 className="cursor-pointer object-contain"
             />
          )}
           <Image  
              onClick={handleDelete}
                src='/assets/icons/trash.svg'
                alt='delete icon'
                height={18}
                width={18}
                 className="cursor-pointer object-contain"
             />
    </div>
  )
}

export default EditDeleteAction