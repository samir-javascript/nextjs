'use client'
import { Form, FormControl,FormField, FormItem,  FormMessage } from "../ui/form";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { AnswerSchema } from "@/lib/Validation";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast"

import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.actions";
import { usePathname } from "next/navigation";

interface props {
   question: string;
   questionId: string;
   authorId: string;
}
const Answer = ({question, questionId, authorId}:props) => {
  const { toast } = useToast()
  const [isSubmittingAi, setIsSubmittingAi] = useState(false)
  const { mode } = useTheme()
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const editorRef = useRef(null)
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: ""
    }
  });
  const handleGenerateAnswer = async()=> {
     if(!authorId) return;
      setIsSubmittingAi(true)
      try {
         const response = await fetch(`${process.env.NEXT_SERVER_URL}/api/chatgpt`, {
            method:'POST',
            body: JSON.stringify({question})
         })
         const aiAnswer = await response.json()
       //  alert(aiAnswer.reply)
         const formattedAnswer = aiAnswer.reply.replace(/\n/g, "<br />")
         if(editorRef.current) {
           const editor = editorRef.current as any;
           editor.setContent(formattedAnswer)
         }
        return toast({
          title: "Ai Answer Generated",
          description: "Ai has successfuly generated an answer based on your query",
        })
         //console.log("HERE IS AI ANSWER",aiAnswer)
      } catch (error) {
        console.log(error)
        throw error;
      }finally {
         setIsSubmittingAi(false)
      }

      

  }
  const handleCreateAnswer = async (values:z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true)
    try {
      await createAnswer({
         content: values.answer,
         path: pathname,
         question: questionId,
         author: authorId
      })
      form.reset()
      if(editorRef.current) {
         const editor = editorRef.current as any;
         editor.setContent('')
      }
     return toast({
        title: "Posted successfuly",
        description: "Your answer has been posted successfuly",
      })
    } catch (error) {
       console.log(error)
    }finally {
      setIsSubmitting(false)
    }
    // Add your logic for handling the form submission here
  };

  return (
    <div>
       <div className="flex justify-between mt-3 gap-5 sm:flex-row flex-col sm:items-center sm:gap-2">
           <h4 className="text-dark400_light800 paragraph-semibold">write your answer</h4>
           <Button onClick={handleGenerateAnswer} className="btn px-4 py-2.5 rounded-md dark:text-primary-500
            shadow-none light-border-2 gap-1.5 text-primary-500">
            <Image src='/assets/icons/stars.svg' alt='stars' width={12} height={12} className="object-contain"  />
             {isSubmittingAi ? 'Generating...' : 'Generate AI answer'}  
           </Button>
       </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleCreateAnswer)} className="flex flex-col gap-10 mt-6">
      <FormField 
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full ">
              
              <FormControl className=" !background-light900_dark300">
                <Editor  
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_key}
                  onInit={(evt, editor) =>
                    // @ts-ignore
                    (editorRef.current = editor)
                  }
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  
                  
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "codesample",
                      "print",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "paste",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "codesample | undo redo | forecolor | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist",

                    content_style: "body { font-family:Inter; font-size:16px;  background-light900_dark300 }",
                    skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                    content_css: mode === 'dark' ? 'dark' : 'light'
                  }}
                />
              </FormControl>
             
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
         <div className="flex justify-end">
            <Button disabled={isSubmitting} className="primary-gradient w-fit text-white " type="submit">
                 {isSubmitting ? 'Submitting...' : "Submit"}
            </Button>
         </div>
      </form>
    </Form>
    </div>
  );
};

export default Answer;
