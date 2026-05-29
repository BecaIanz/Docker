"use client"

import { Menu } from "@/src/components/menu";
import { BackButton } from "@/src/components/backButton";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextLessonButton } from "@/src/components/nextLessonButton";
import { use } from 'react';
import { api } from "@/src/constants/api";

const textLessonExemple = {
    id: "",
    title: "",
    courseId: 5,
    moduleId: 1,
    completed: false,
    content: [
        {
        title: "",
        description: "",
        image: ""
        }
    ]
}

// const nextLessonHref = () => {
//     const nextLesson = textLessonExemple.nextLesson;
    
//     switch(nextLesson.type) {
//       case 1:
//         return `/textLesson/${nextLesson.id}`;
//       case 2:
//         return `/videoLesson/${nextLesson.id}`;
//       case 3:
//         return `/quiz/${nextLesson.id}`;
//       case 4:
//         return `/project/${nextLesson.id}`;
//       case 5:
//         return `/exam/${nextLesson.id}`;
//       default:
//         return '/';

//     }
// }

const textLesson = ({ params } : { params: Promise<{ textLessonId: string }> }) => {
    const token = sessionStorage.getItem("Token");
    const { textLessonId } = use(params);

    const [lesson, setLesson] = useState(textLessonExemple);


    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await api.get(`/lessons/${textLessonId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setLesson(response.data);
            } catch (error) {
                console.error("Erro ao buscar Lesson:", error);
            }
        };
        

    
        fetchLesson();
        }, []);



    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex gap-8 items-center w-full p-1">
                    <BackButton/>
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">{lesson.title}</h1>
                </div>

                {/* Details */}
                <div className="flex flex-col md:p-10 p-3 bg-(--card) shadow-(--shadow) rounded-2xl gap-10">
                    {lesson.content.map((content, index) => (
                        <React.Fragment key={index}>
                            {content.description != null ? 
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-(--text) text-xl font-bold">{content.title}</h1>
                                    <p className="text-(--text)">{content.description}</p>
                                </div>
                            :
                                <Image className="self-center md:max-w-10/12 rounded-xl" src={content.image} alt={content.image.toString()} width={3000} height={3000} priority></Image>
                                    
                            }
                        </React.Fragment>
                    ))}
                    <div className="self-center">
                        {/* <NextLessonButton href={nextLessonHref()}></NextLessonButton> */}

                    </div>

                </div>
            </div>
        </>
    )
}

export default textLesson;