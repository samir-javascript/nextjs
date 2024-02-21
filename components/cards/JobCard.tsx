import { formatAndDivideNumber, getTimesTamp } from "@/lib/utils";
import Link from "next/link";
import Metric from "../shared/Metric";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";
import Image from "next/image";
import { Button } from "../ui/button";



const JobCard = ({job}:any) => {
  
  return (
      <div className="card-wrapper p-9   sm:px-11 border md:mr-5 light-border-2 rounded-[10px]">
            <div className="flex sm:flex-row gap-4 flex-col-reverse sm:items-center items-start">
                 <div className="flex items-start gap-4 sm:flex-row flex-col">
                      <Image src={job.employer_logo ? job.employer_logo : '/assets/images/site-logo.svg'} className="object-contain" alt='logo' width={80} height={80} />
                      <div className="flex flex-col max-sm:gap-3 gap-1 ">
                          <h3 className="base-semibold sm:h3-semibold  text-dark200_light900 line-clamp-2 
                flex-1
            ">   {job.job_title} </h3>
                          <div className="flex max-sm:hidden px-3 my-3 w-fit py-1 rounded-xl text-dark200_light800 background-light800_dark300 items-center gap-2">
                               <Image  src='/assets/icons/64.webp' alt='icon' width={30} height={30} />
                               <p>{job.job_city} {job.job_state}, {job.job_country}</p>
                          </div>
                          <p className=" text-dark100_light900 body-medium  line-clamp-2">
                             {job.job_description}
                          </p>
                        <div className="flex items-center justify-between flex-wrap gap-3 mt-5">
                            <div className="flex items-center gap-8">
                            <div className="flex items-center gap-1.5">
                                  <Image src='/assets/icons/clock.svg' alt='' width={22} height={22} />
                                  <p className="uppercase text-dark400_light700  body-medium whitespace-nowrap">
                                     {job.job_employment_type}
                                  </p>
                             </div>
                             <div className="flex items-center gap-1.5">
                                  <Image src='/assets/icons/currency-dollar-circle.svg' alt='' width={22} height={22} />
                                  <p className="uppercase text-dark400_light700 body-medium whitespace-nowrap">not disclosed</p>
                             </div>
                            </div>
                            

                            <Link target="_blank" href={job.job_apply_link}>
                            <Button type="button" className="flex items-center whitespace-nowrap gap-2">
                                <p className="capitalize text-primary-500 font-semibold">view job</p>  <Image src='/assets/icons/arrow-up-right.svg' alt='' width={20} height={20} className="" />
                             </Button>
                            </Link>
                            
                        </div>
                      </div>
                 </div>
                 <div className="max-sm:flex hidden justify-end w-full">
                 <div className=" flex px-3 my-3 w-fit py-1 rounded-xl text-dark200_light800 background-light800_dark300 items-center gap-2">
                               <Image  src='/assets/icons/64.webp' alt='icon' width={30} height={30} />
                               <p>{job.job_city} {job.job_state}, {job.job_country}</p>
                          </div>
                 </div>
                     
            </div>
      </div>
  )
}

export default JobCard