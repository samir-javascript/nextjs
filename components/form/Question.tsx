"use client";
import { QuestionSchema } from "@/lib/Validation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";

import { useRouter, usePathname } from "next/navigation";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { useTheme } from "@/context/ThemeProvider";
import { useToast } from "../ui/use-toast";

interface props {
   mongoUserId: string;
   type?: string;
   questionDetails?: string;
}
export default function Question({mongoUserId, type, questionDetails}:props) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const  {mode }= useTheme()
  const editorRef = useRef(null);
  const router = useRouter();
  const pathName = usePathname();
  const parsedQuestions = questionDetails ? JSON.parse(questionDetails) : {};
  const groupedTags = parsedQuestions?.tags?.map((tag:any) => tag.name)
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: parsedQuestions.title || "",
      explanation: parsedQuestions.content || "",
      tags: groupedTags || [],
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(true);
  
    try {
      
      if(type !== 'edit') {
        await createQuestion({
          title: values.title,
          content: values.explanation,
          tags: values.tags,
          author: mongoUserId,
          path: pathName
        });
        router.push('/');
       return toast({
          title:"question created",
          description: 'your question has been created successfuly'
        })
       
      }else {
         await editQuestion({
           title: values.title,
           content: values.explanation,
           path: pathName,
           questionId: parsedQuestions._id
         })
         router.push(`/question/${parsedQuestions._id}`)
      }
     
     
     
     
    } catch (error) {
      console.error('Error submitting question:', error);
    } finally {
      setIsSubmitting(false);
    }
  }
  

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "tags must be at least less than 15 characters!",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };
  
  const handleRemoveTag = (tag: string, field: any) => {
    const newTags = field.value.filter((item: string) => item !== tag);
    form.setValue("tags", newTags);
  };
 
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-6 flex-col"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>
                <p className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-red-500">*</span>
                </p>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 min-h-[56px]
                     background-light900_dark300 border text-dark300_light700 placeholder
                  "
                  placeholder="Enter your question"
                  {...field}
                 
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Be specific and imagine you're asking a question to another
                person
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full ">
              <FormLabel>
                <p className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your problem?{" "}
                  <span className="text-red-500">*</span>
                </p>
              </FormLabel>
              <FormControl className=" !background-light900_dark300">
                <Editor  
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_key}
                  onInit={(evt, editor) =>
                    // @ts-ignore
                    (editorRef.current = editor)
                  }
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  initialValue={parsedQuestions.content || ""}
                  
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
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>
                <p className="paragraph-semibold text-dark400_light800">
                  Tags <span className="text-red-500">*</span>
                </p>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                  disabled={type === 'edit'}
                    className="no-focus paragraph-regular light-border-2 min-h-[56px]
                     background-light900_dark300 border text-dark300_light700 placeholder
                  "
                    placeholder="Add Tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start gap-2.5 mt-2.5">
                      {field.value.map((tag) => (
                        <Badge
                          className="background-light800_dark300 capitalize rounded-md
                           subtle-medium text-light400_light500
                              border-none flex items-center justify-center gap-2 px-4 py-2
                           "
                          key={tag}
                        >
                          {tag}
                          {type !== "edit" && (
                            <Image
                            src="/assets/icons/close.svg"
                            width={12}
                            height={12}
                            alt="close icon"
                            className="cursor-pointer object-contain invert-0 dark:invert justify-self-end"
                            onClick={ type !== 'edit' ? () =>   handleRemoveTag(tag, field): ()=> {}}
                          />
                          )}
                          
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add up to 3 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          className="primary-gradient w-fit !text-light-900"
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "posting"}</>
          ) : (
            <>{type === "edit" ? "Edit question" : "ask a question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
}
