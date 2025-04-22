
"use client"
import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { interviewCovers } from '@/constants';
import { Button } from "@/components/ui/button";
import  Link  from "next/link";
import DisplayTechicons from "./DisplayTechicons";

const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type)? 'Mixed' : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>
                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover image"
                        width={90}
                        height={90}
                        className="rounded-full object-fit size-[90px]"
                    />
                    <h3 className="mt-5 capitalize">{role} Interview</h3>


                    <div className="flex flex-col gap-5 mt-3">
                        <div className="flex flex-row gap-2">
                            <Image src="\calendar.svg" alt="calendar"
                            width={22} height={22} />
                            <p>{formattedDate}</p>

                            <div className="flex flex-row gap-2">
                                <Image src="/star.svg" alt="star" width={22} height={22} />
                                <p>{feedback?.totalScore || '---'}/100</p>
                            </div>
                        </div>

                        <p className="line-clamp-2 mt-5">
                            {feedback?.finalAssessment || "Your haven&apos;t taken the interview yet. Take it now to improve your skills."}
                        </p>
                    </div>

                    <div className="flex flex-row justify-between mt-6">
                       <DisplayTechicons techStack={techstack} />

                        <Button className ="btn-primary">
                            <Link href={feedback
                            ?`/interview/${interviewId}/feedback`
                            :`/interview/${interviewId}`
                            }>
                                {feedback? 'Check Feedback' : 'View Interview'}
                            </Link>
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default InterviewCard;






// "user client"
// import React from "react";
// import dayjs from "dayjs";
// import Image from "next/image";
// import { getRandomInterviewCover } from "@/public/utils";
// import { interviewCovers } from '@/constants';

// const InterviewCard = ({ interviewId, userId, role, type,techStack, createdAt

//   }:InterviewCardProps) =>{
//     const feedback = null as Feedback | null;
//    const normalizedType = /mix/gi.test(type)? 'Mixed' : type;
//    const formattedDate  = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');
// const InterviewCard = ({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
//   const feedback = null as Feedback | null;
//   const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
//   const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');

//   return (
//     <div className="card-border w-[360px] max-sm:w-full min-h-96">
//       <div className="card-interview">
//         <div>
//           <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
//             <p className="badge-text">{normalizedType}</p>
//           </div>
//           <Image
//             src={getRandomInterviewCover()}
//             alt="cover image"
//             width={90}
//             height={90}
//             className="rounded-full object-fit size-[90px]"
//           />
//           <h3 className="mt-5 capitalize">
//             {role} Interview
//           </h3>

//           <div className = "flex flex-row gap-5 mt-3">
//             <div className="flex flex-row gap-2">
//                 <Image src="/calender.svg" alt="calendar"
//                 width={22} height={22} />
//                 <p>{formattedDate}</p>

//                 <div className="flex flex-row gap-2">
//                     <Image src="/star.svg" alt="star" width={22} height={22} />
//                     <p>{feedback?.totalScore || '---'}/100</p>
//                 </div>

//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-4">
//         <p>Role: {role}</p>
//         <p>Tech Stack: {techstack.join(', ')}</p>
//         <p>Date: {formattedDate}</p>
//       </div>
//     </div>
//   );
// };

//     return (

//         <div className="card-border w-[360px] max-sm:w-full min-h-96">
//             <div className="card-interview">
//                 <div>
//                     <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
//                         <p className="badge-text">
//                             {normalizedType}
//                         </p>
//                     </div>
//                     <Image src={getRandomInterviewCover()} alt="cover image"
//                      width={90} height={90} className="rounded-full object-fit size-[90px] " />
//                 </div>
//             </div>     
//         </div>
//     )
// }




// export default InterviewCard;

// "use client"
// import React from "react";
// import dayjs from "dayjs";
// import Image from "next/image";
// import { getRandomInterviewCover } from "@/public/utils";

// interface InterviewCardProps {
//   interviewId: string;
//   userId: string;
//   role: string;
//   type: string;
//   techStack?: string[]; // Make it optional
//   createdAt: Date;
// }

// interface Feedback {
//   createdAt?: Date;
//   totalScore?: number;
// }

// const InterviewCard = ({ 
//   interviewId, 
//   userId, 
//   role, 
//   type, 
//   techStack = [], // Default empty array
//   createdAt 
// }: InterviewCardProps) => {
//   const feedback = null as Feedback | null;
//   const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
//   const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format('MMM D, YYYY');

//   return (
//     <div className="card-border w-[360px] max-sm:w-full min-h-96">
//       {/* ... other card content ... */}
      
//       <div className="mt-4">
//         <p>Role: {role}</p>
//         <p>Tech Stack: {techStack?.join(', ') || 'Not specified'}</p>
//         <p>Date: {formattedDate}</p>
//       </div>
//     </div>
//   );
// };

// export default InterviewCard;
