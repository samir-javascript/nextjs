"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
   
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  
  import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

import { ProfileSchema } from "@/lib/Validation";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/question.action";
import { useToast } from "../ui/use-toast";

interface props  {
     user: string;
     clerkId: string;
}
const ProfileForm = ({user, clerkId}:props) => {
  const { toast } = useToast()
  const pathname = usePathname()
  const router = useRouter()
  const parsedUser = JSON.parse(user)
   
    const [submitting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
          name: parsedUser?.name || "",
          username: parsedUser?.username  || '',
          portfolioWebsite: parsedUser.portfolioWebsite || "",
          location: parsedUser.location || "",
          bio: parsedUser.bio ||  ""
        },
      });
      async function onSubmit(values: z.infer<typeof ProfileSchema>) {
        setIsSubmitting(true);
      
        try {
          // make an async call to your db api to create a question 
          // that contains all form data 
          await updateUser({
            clerkId,
            updateData: {
               bio: values.bio,
               name: values.name,
               username: values.username,
               portfolioWebsite: values.portfolioWebsite,
               location: values.location
            },
            path: pathname
          })
          router.back()
         return toast({
            title: "Profile updated",
            variant: 'destructive',
            description: "Your profile has been successfully updated",
          });
        //  router.back();
        } catch (error) {
          console.error('Error editing user info:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full gap-8 flex-col"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>
                <p className="paragraph-semibold text-dark400_light800">
                 User Name <span className="text-red-500">*</span>
                </p>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 min-h-[56px]
                     background-light900_dark300 border text-dark300_light700 placeholder
                  "
                  placeholder="Enter your name"
                  {...field}
                 
                />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        

        <FormField
          control={form.control}
          name="username"
          
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>
                <p className="paragraph-semibold text-dark400_light800">
                  your username <span className="text-red-500">*</span>
                </p>
              </FormLabel>
              <FormControl>
                <>
                  <Input
                  
                    className="no-focus paragraph-regular light-border-2 min-h-[56px]
                     background-light900_dark300 border text-dark300_light700 placeholder
                  "
                    placeholder="Enter your user name..."
                    {...field}
                  />
                
                   
                  
                </>
              </FormControl>
             
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="portfolioWebsite"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>
                <p className="paragraph-semibold text-dark400_light800">
                 your portfolio URL
                </p>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 min-h-[56px]
                     background-light900_dark300 border text-dark300_light700 placeholder
                  "
                  placeholder="Enter your website Url"
                  {...field}
                 
                />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>
                <p className="paragraph-semibold text-dark400_light800">
                 User bio <span className="text-red-500">*</span>
                </p>
              </FormLabel>
              <FormControl>
                <Textarea
                rows={5}
                  className="no-focus paragraph-regular light-border-2 min-h-[56px]
                     background-light900_dark300 border text-dark300_light700 placeholder
                  "
                  placeholder="what's special about you"
                  {...field}
                 
                />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>
                <p className="paragraph-semibold text-dark400_light800">
                 User Location 
                </p>
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular light-border-2 min-h-[56px]
                     background-light900_dark300 border text-dark300_light700 placeholder
                  "
                  placeholder="Enter your location"
                  {...field}
                 
                />
              </FormControl>
              
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          disabled={submitting}
          type="submit"
          className="primary-gradient w-fit !text-light-900"
        >
            {submitting ? 'saving...': 'save'}
        </Button>
      </form>
    </Form>
  )
}

export default ProfileForm